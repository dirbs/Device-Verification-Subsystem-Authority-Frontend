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
import i18n from './../../i18n';
import {translate, I18n} from 'react-i18next';
import {Card, CardTitle, Form} from 'reactstrap';
import {withFormik, Field} from 'formik';
import {getAuthHeader, errors, instance} from '../../utilities/helpers'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoxLoader from '../../components/BoxLoader/BoxLoader'
import Pagination from "react-js-pagination";
import SeenWithTable from './SeenWithTable'
import AssociatedData from './AssociatedData'
import DeviceStatusTable from './DeviceStatusTable'
import renderInput from '../../components/Form/renderInput'
import * as i18next from "i18next";

/**
 * React functional (presentational) component used in WithFormik HOC
 * @param values
 * @param errors
 * @param touched
 * @param handleChange
 * @param handleBlur
 * @param handleSubmit
 * @param isSubmitting
 * @param disableButton
 * @param isValid
 * @returns Form that includes Input and submit button
 * @constructor
 */
export const VerifyImeiForm = ({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          disableButton,
                          isValid
                        }) => (
  <Form onSubmit={handleSubmit}>
    <div className="row">
      <Field class="col-md-9 col-sm-7" name="imei" maxLength="16" component={renderInput}
             label={i18n.t('checkStatus.label')} type="text" placeholder={i18n.t('checkStatus.placeholder')} requiredStar/>
      <div className="col-md-3 col-sm-5">
        <div className="form-group">
          <label className="">&nbsp;</label>
          <button className="btn btn-primary btn-block" type="submit"
                  disabled={!(isValid || disableButton) || (isValid && disableButton)}>{i18n.t('submit')}</button>
        </div>
      </div>
    </div>
  </Form>
)
/**
 * WithFormik HOC with takes a components VerifyImeiForm and include all the Validations required
 * Returns: MyEnhancedForm returns a component with all the validations
 * @type {React.ComponentType<any>}
 */
const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({imei: ""}),
  validate: values => {
    let errors = {};
    // IMEIs Validation
    if (!values.imei) {
      errors.imei = i18next.t('errors.FeildReq')
    } else if (!/^(?=.[A-F]*)(?=.[0-9]*)[A-F0-9]{14,16}$/.test(values.imei) ) {
      errors.imei = i18next.t('errors.Imie')
    }
    return errors;
  },
  handleSubmit: (values, {
    props,
    setSubmitting
  }) => {
    setSubmitting(false);
    //Call Props function for Sever Call
    props.callServer(values.imei)
  },
  displayName: 'VerifyImeiForm', // helps with React DevTools
})(VerifyImeiForm);

class VerifyImei extends Component {
  //State Structure
  constructor(props) {
    super(props);
    this.state = {
      imei: null,
      showDeviceStatusTable: false,
      loader: false,
      subscribers: {
        data: [],
        activePage: 1,
        start: 1,
        limit: 6,
        count: null,
      },
      classificationStates: [],
      showSubscribersTable: false,
      subscribersLoader: false,
      showPairsTable: false,
      pairsLoader: false,
      pairs: {
        data: [],
        activePage: 1,
        start: 1,
        limit: 6,
        count: null,
      },
      disableButton: false

    }
    this.getDeviceStatus = this.getDeviceStatus.bind(this);
    this.handlePageChangePairs = this.handlePageChangePairs.bind(this);
    this.handlePageChangeSeenWith = this.handlePageChangeSeenWith.bind(this);
    this.getContentFromServer = this.getContentFromServer.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
  }

  /**
   * Fetch Paginated Data from API
   * @param pairs subscribers
   */
  getContentFromServer(config,param) {
    let data = {}
    this.setState({
      disableButton: true,
    })
    if (param === "subscribers") {
      this.setState({
        showSubscribersTable: false,
        subscribersLoader: true
      })
      data = {
        "imei": this.state.imei,
        "subscribers": {
          "start": this.state.subscribers.start,
          "limit": this.state.subscribers.limit
        },
        "pairs": {
          "start": this.state.pairs.start,
          "limit": this.state.pairs.limit
        }
      }
      instance.post(`/fullstatus`, data, config)
        .then((response) => {
          if (response.data.subscribers.data != null) {
            this.setState({
              subscribers: {
                data: response.data.subscribers.data,
                start: response.data.subscribers.start,
                activePage: this.state.subscribers.activePage,
                limit: 6,
                count: response.data.subscribers.count,
              },
              showSubscribersTable: response.data.subscribers.data.length > 0,
              subscribersLoader: false,
              disableButton: false
            });
          }
        })
        .catch((error) => {
          this.setState({
            loader: false,
            showDeviceStatusTable: false,
            disableButton: false
          })
          errors(this, error)
        })
    } else {
      this.setState({
        showPairsTable: false,
        pairsLoader: true,
      })
      //Prepare data for API call
      data = {
        "imei": this.state.imei,
        "subscribers": {
          "start": this.state.subscribers.start,
          "limit": this.state.subscribers.limit
        },
        "pairs": {
          "start": this.state.pairs.start,
          "limit": this.state.pairs.limit
        }
      }
      //Get Full status
      instance.post(`/fullstatus`, data, config)
        .then((response) => {
          if (response.data.pairs.data != null) {
            //Set State if response has valid Data
            this.setState({
              pairs: {
                data: response.data.pairs.data,
                start: response.data.pairs.start,
                activePage: this.state.pairs.activePage,
                limit: 6,
                count: response.data.pairs.count,
              },
              showPairsTable: response.data.pairs.data.length > 0,
              pairsLoader: false,
              disableButton: false
            });
          }
        })
        .catch((error) => {
          //Set State if API Call fails
          this.setState({
            loader: false,
            showSubscribersTable: false,
            subscribersLoader: false,
            showPairsTable: false,
            pairsLoader: false,
            disableButton: false
          })
          errors(this, error)
        })
    }
  }

  /**
   * Pagination Function for Pairs table
   * @param page
   */
  handlePageChangePairs(page) {
    let a1 = 1;
    let d = this.state.pairs.limit;
    let start = a1 + d * (page - 1);
    //Updating State after calculations
    this.setState({showPairsTable: false, pairsLoader: true, pairs: {start: start, activePage: page,}}, () => {
      //Fetch Data from API after modified state
      this.updateTokenHOC(this.getContentFromServer,"pairs")
    });
  }

  /**
   * Pagination Function for Subscribers table
   * @param page
   */
  handlePageChangeSeenWith(page) {
    let a1 = 1;
    let d = this.state.subscribers.limit;
    let start = a1 + d * (page - 1);
    //Updating State after calculations
    this.setState({
      showSubscribersTable: false,
      subscribersLoader: true,
      subscribers: {start: start, activePage: page, limit: this.state.subscribers.limit}
    }, () => {
      //Fetch Data from API after modified state
      this.updateTokenHOC(this.getContentFromServer,"subscribers")
    });

  }

  /**
   * HOC function to update token
   * @param callingFunc
   */
  updateTokenHOC(callingFunc, param) {
    let config = null;
    if (this.props.kc.isTokenExpired(0)) {
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

  /**
   * Fetch Full Status Data from API
   * @param imei
   */
  getDeviceStatus(config, imei) {
    //Prepare data for API call
    this.setState({
        loader: true,
        showDeviceStatusTable: false,
        showSubscribersTable: false,
        subscribersLoader: true,
        disableButton: true,
        subscribers: {
          data: [],
          activePage: 1,
          start: 1,
          limit: 6,
          count: null,
        },
        pairs: {
          data: [],
          activePage: 1,
          start: 1,
          limit: 6,
          count: null,
        },
        classificationStates: [],
        showPairsTable: false,
        pairsLoader: true,
        imei: imei
      }
      , () => {
        //Get IMEI Status
        let data = {
          "imei": this.state.imei,
          "subscribers": {
            "start": this.state.subscribers.start,
            "limit": this.state.subscribers.limit
          },
          "pairs": {
            "start": this.state.pairs.start,
            "limit": this.state.pairs.limit
          },

        }
        instance.post(`/fullstatus`, data, config)
          .then((response) => {
            this.setState({
              data: response.data,
              subscribers: response.data.subscribers,
              pairs: response.data.pairs,
              showDeviceStatusTable: true,
              showSubscribersTable: true,
              subscribersLoader: false,
              loader: false,
              showPairsTable: true,
              pairsLoader: false,
              disableButton: false
            });
            Object.values(response.data.classification_state).map((status) => {
              return status.map((condition) => {
                return this.setState({
                  classificationStates: [...this.state.classificationStates, condition]
                });
              })
            })
          })
          .catch((error) => {
            this.setState({
              loader: false,
              showDeviceStatusTable: false,
              showPairsTable: false,
              pairsLoader: false,
              showSubscribersTable: false,
              subscribersLoader: false,
              disableButton: false
            })
            errors(this, error)
          })
      })
  }

  render() {
    return (
      <I18n ns="translations">
        {
          (t) => (
            <div>
              <ToastContainer/>
              <div className="animated fadeIn">
                <Card>
                  <CardTitle className="card-header">{t('verifyImei.header')}</CardTitle>
                  <div className="card-body">
                    <MyEnhancedForm disableButton={this.state.disableButton}
                                    callServer={(imei) => this.updateTokenHOC(this.getDeviceStatus, imei)}/>
                  </div>
                </Card>
              </div>
              <div className="row">
                <div className="col-xl-8">
                  {
                    (this.state.loader)
                      ?
                      <BoxLoader/> :
                      <DeviceStatusTable data={this.state.data} visible={this.state.showDeviceStatusTable}
                                         classificationStates={this.state.classificationStates}/>
                  }
                </div>
                <div className="col-xl-4">
                  <div className="row">
                    <div className="col-xl-12">
                      {this.state.subscribersLoader ? <BoxLoader/> :
                        this.state.showSubscribersTable &&
                        <SeenWithTable title={t('seenWith.title')} data={this.state.subscribers.data}/>}
                      {(this.state.showSubscribersTable && this.state.subscribers.data.length > 0) &&
                      <Pagination
                        pageRangeDisplayed={3}
                        activePage={this.state.subscribers.activePage}
                        itemsCountPerPage={this.state.subscribers.limit}
                        totalItemsCount={this.state.subscribers.count}
                        onChange={this.handlePageChangeSeenWith}
                        innerClass="pagination float-right mt-0 mb-4"
                      />
                      }
                    </div>
                    <div className="col-xl-12">
                      {this.state.pairsLoader ? <BoxLoader/> :
                        this.state.showPairsTable &&
                        <AssociatedData title={t('pairs.title')} data={this.state.pairs.data}/>}
                      {this.state.showPairsTable && this.state.pairs.data.length > 0 &&
                      <Pagination
                        pageRangeDisplayed={3}
                        activePage={this.state.pairs.activePage}
                        itemsCountPerPage={this.state.pairs.limit}
                        totalItemsCount={this.state.pairs.count}
                        onChange={this.handlePageChangePairs}
                        innerClass="pagination float-right mt-0 mb-4"
                      />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    )
  }
}

// export default translate('translations')(VerifyImei);
// export default VerifyImei;
export default translate('translations')(VerifyImei);
