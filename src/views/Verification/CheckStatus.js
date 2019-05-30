/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import React, {Component} from 'react';
import {translate, I18n} from 'react-i18next';
import {Row, Col, Button, Collapse} from 'reactstrap';
import {errors, getAuthHeader, instance, deleteTrackingId, SweetAlert} from '../../utilities/helpers'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkVerifyStatusTable from '../../views/BulkVerification/BulkVerifyStatusTable'
import FileSaver from "file-saver";
import i18n from "../../i18n";

/**
 * React Stateful component consist of Bulk status information
 * Props: term, created, value
 * Returns: A Toggleable section with Status information and Sub Components
 */
export class StatusCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      status: 'PENDING',
      statusTable: false,
      statusData: null,
      fileName: '',
      hasReport: false,
    }
    this.toggle = this.toggle.bind(this);
    this.downloadRecord = this.downloadRecord.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }

  /**
   * HOC function to update token
   * @param callingFunc
   */
  updateTokenHOC(callingFunc, param = null) {
    let config = null;
    if (this.props.kcProps.kc.isTokenExpired(0)) {
      this.props.kcProps.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kcProps.kc.token)
          config = {
            headers: getAuthHeader(this.props.kcProps.kc.token)
          }
          callingFunc(config, param);
        })
        .error(() => this.props.kcProps.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config, param);
    }
  }

  /**
   * Toggle function
   * Returns: Toggle the trigger
   */
  toggle(config) {
    //Checks if Data is loaded. To avoid API calls each time.
    if (this.state.collapse || this.state.statusData !== null) {
      this.setState({
        collapse: !this.state.collapse
      })
    } else {
      //Fetch Status
      instance.post(`/bulkstatus/${this.props.value}`, null, config)
        .then((response) => {
           //If the State is PENDING
          if (response.data.state === "PENDING") {
            SweetAlert({
              title: i18n.t('info'),
              message: i18n.t('status.pending'),
              type: 'info'
            })
            this.setState({status: response.data.state})
          }
          //If state = SUCCESS
          else if (response.data.state === "SUCCESS") {
            console.log("i am here")
            //If Report is not generated
            if (response.data.result.compliant_report_name === "report not generated.") {
              this.setState({
                fileName: '',
                hasReport: false
              })
            } else {
              this.setState({
                fileName: response.data.result.response.compliant_report_name,
                hasReport: true
              })
              console.log(response.data.result.response.compliant_report_name)
            }
            //Toggle collapse and update state data
            this.setState({
              collapse: !this.state.collapse,
              statusData: response.data.result.response,
              status: response.data.state
            });
             
          } else {
            //Delete the record when its seen
            deleteTrackingId(this.props.value)
            this.setState({
              collapse: false,
              status: "Not found"
            });
            SweetAlert({
              title: i18n.t('info'),
              message: i18n.t('status.NotFound'),
              type: 'error'
            })
          }
        })
        .catch((error) => {
          this.setState({
            collapse: false
          })
          errors(this, error)
        })
    }
  }

  /**
   * Download Report
   * @param e
   */
  downloadRecord(config, e) {
    e.preventDefault()
    instance.post(`/download/${this.state.fileName}`, null, config)
      .then((response) => {
        let file = new File([response.data], "download.tsv", {type: "tsv;charset=utf-8"});
        FileSaver.saveAs(file);
      })
      .catch((error) => {
        errors(this, error)
      })
  }

  render() {
    return (
      <I18n ns="translations">
        {
          (t) => (
            <div>
              <Row className="tablerow">
                <Col data-label={t('checkStatus.trackingId')} xs="12" md="4">{this.props.value}</Col>
                <Col data-label={t('checkStatus.currentStatus')} xs="12" md="2">{this.props.status}</Col>
                <Col data-label={t('checkStatus.createdAt')} xs="12" md="2">{this.props.created}</Col>
                <Col data-label={t('checkStatus.term')} xs="12" md="2">{this.props.term}</Col>
                <Col data-label={t('checkStatus.checkStatus')} xs="12" md="2">
                  <Button color="primary" onClick={() => this.updateTokenHOC(this.toggle)}
                          size="sm">{t('CheckStatus')}</Button>
                </Col>
              </Row>
              <Collapse isOpen={this.state.collapse}>
                <BulkVerifyStatusTable data={this.state.statusData} visible={true}/>
                {this.state.hasReport &&
                <p className="download_report">
                  <button className="btn btn-link"
                          onClick={(e) => this.updateTokenHOC(this.downloadRecord, e)}>{t('bulkverify.download')}</button>
                </p>
                }
              </Collapse>
            </div>
          )
        }
      </I18n>
    )
  }
}

class CheckStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
      noIds: true
    }
  }

  updateTokenHOC(callingFunc, param = null) {
    let config = null;
    if (this.props) {
      this.props.kc.updateToken(0)
        .success(() => {
          localStorage.setItem('token', this.props.kc.token)
          config = {
            headers: getAuthHeader(this.props.kc.token)
          }
          callingFunc(config, param);
        })
        .error(() => this.props.kc.logout());
    } else {
      config = {
        headers: getAuthHeader()
      }
      callingFunc(config, param);
    }
  }

  getAllRequests = (config) =>{
    let userId = this.props.userDetails.sub;
    instance.get('/requests/'+userId, config)
          .then((response) => {
            if(response.data.length>0){
              this.setState({
                requests: response.data,
                noIds: false
              })
            }else{
              this.setState({
                noIds: true
              })
            }    
            })
  }

  componentDidMount() {
     this.updateTokenHOC(this.getAllRequests)
          }

  render() {
    const {requests, noIds} = this.state
    return (
      <I18n ns="translations">
        {
          (t) => (
            <div className="tablerowbox">
              <ToastContainer/>
              {noIds ? <div className='nodata'>{t('checkStatus.noResults')}</div> :
                <Row className="tablehead">
                  <Col md="4">{t('checkStatus.trackingId')}</Col>
                  <Col md="2">{t('checkStatus.currentStatus')}</Col>
                  <Col md="2">{t('checkStatus.createdAt')}</Col>
                  <Col md="2">{t('checkStatus.term')}</Col>
                  <Col md="2">{t('checkStatus.checkStatus')}</Col>
                </Row>
              }
              {requests &&
              requests.length > 0 && requests.map((request, index) => {
                return (<div key={index}>
                <StatusCollapse term={request.input} created={request.summary_id} status={request.status} value={request.tracking_id} kcProps={this.props}/>
                </div>)
              })
              }
            </div>
          )
        }
      </I18n>
    )
  }
}

export default translate('translations')(CheckStatus);
