/* SPDX-License-Identifier: BSD-4-Clause-Clear
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted (subject to the limitations in the disclaimer
below) provided that the following conditions are met:

  - Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
  - All advertising materials mentioning features or use of this software,
  or any deployment of this software, or documentation accompanying any
  distribution of this software, must display the trademark/logo as per the
  details provided here:
  https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
  - Neither the name of Qualcomm Technologies, Inc. nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.


SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from
the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

  - The origin of this software must not be misrepresented; you must not
  claim that you wrote the original software. If you use this software in a
  product, an acknowledgment is required by displaying the trademark/logo as
  per the details provided here:
  https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
  - Altered source versions must be plainly marked as such, and must not
  be misrepresented as being the original software.
  - This notice may not be removed or altered from any source distribution.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import React, {Component} from 'react';
import {translate, I18n} from 'react-i18next';
import {Row, Col, Button, Collapse} from 'reactstrap';
import {errors, getAuthHeader, instance, SweetAlert} from '../../utilities/helpers'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkVerifyStatusTable from '../../views/BulkVerification/BulkVerifyStatusTable'
import FileSaver from "file-saver";
import i18n from "../../i18n";
import moment from 'moment';
import BoxLoader from '../../components/BoxLoader/BoxLoader';

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
      status: '',
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
         if(i18n.t('checkStatus.status.pending') === this.props.status){
          //If the State is PENDING
           
            SweetAlert({
              title: i18n.t('info'),
              message: i18n.t('status.pending'),
              type: 'info'
            })
            
         }
          //If state = SUCCESS
          else if (i18n.t('checkStatus.status.success') === this.props.status) {
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
           }
            //Toggle collapse and update state data
            this.setState({
              collapse: !this.state.collapse,
              statusData: response.data.result.response,
              status: i18n.t('requestsSuccess')
            });
             
          } else {
            this.setState({
              collapse: false,
              status: "Already Exists"
            });
            SweetAlert({
              title: i18n.t('error'),
              message: response.data.state,
              type: 'error'
            })
          }
        }
        )
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
      noIds: true, 
      result:[],
      apiFetched: false
    }
  }

  updateTokenHOC(callingFunc, param = null) {
    let config = null;
    if (this.props) {
      console.log(this.props)
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

  checkInputType(type){
    if(type.includes('.tsv')){
      return "FILE: "+type
    }else{
      return "TAC: "+type
    }
  }
  
  
getUniqueValues =(value)=>{ 
  return Array.from(new Set(value.map( s => s.tracking_id)))
 .map(id => {
   return  value.find(s => s.tracking_id === id)  
 }) 
 }

  getAllRequests = (config) =>{
    let userId = this.props.userDetails.sub;
    instance.get('/requests/'+ userId, config)
          .then((response) => {
            if(response.data.length>0){   
              this.setState({
                requests:this.getUniqueValues(response.data),
                noIds: false,
                apiFetched: true
              },()=>{ })
            }else{
              this.setState({
                noIds: true,
                apiFetched: true
              })
            }    
            })
           
  }

  componentDidMount() {
     this.updateTokenHOC(this.getAllRequests)
     
          }

  render() {
    const {requests, noIds, apiFetched} = this.state
    return (
      <I18n ns="translations">
        {
          (t) => (
            <div className="tablerowbox">
              <ToastContainer/>
              {
                 noIds ? <BoxLoader/> 
                : 
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
                <StatusCollapse term={this.checkInputType(request.input)} created={moment(request.start_time).format("D/MM/YYYY")} status={request.status} value={request.tracking_id} kcProps={this.props}/>
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
