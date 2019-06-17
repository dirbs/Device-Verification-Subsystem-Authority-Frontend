/* SPDX-License-Identifier: BSD-4-Clause-Clear
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:
·         Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
·         Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
·         All advertising materials mentioning features or use of this software, or any deployment of this software, or documentation accompanying any distribution of this software, must display the trademark/logo as per the details provided here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
·         Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 

SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT
Copyright (c) 2018 Qualcomm Technologies, Inc.
This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.
Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
·         The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment is required by displaying the trademark/logo as per the details provided here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
·         Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
·         This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {translate, I18n} from 'react-i18next';
import {Card, CardTitle, Form, Alert} from 'reactstrap';
import {withFormik, Field} from 'formik';
import {getAuthHeader, getExtension, errors, instance, SweetAlert} from '../../utilities/helpers'
import {SAME_REQUEST_SPANISH, SAME_REQUEST_INDONESIAN, SAME_REQUEST_ENGLISH} from '../../utilities/constants';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import renderInput from '../../components/Form/renderInput'
import * as i18next from "i18next";

/**
 * React functional (presentational) component used in WithFormik HOC
 * Returns: Form
 */
export class BulkVerifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileInput: true,
      showTac: false,
      bulkFile: {
        file: null,
        name: "",
        type: ""
      },
      inputError: {
        enabled: false,
        message: ""
      },
    }
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.onFileInputChangeHandler = this.onFileInputChangeHandler.bind(this);
    this.onTacChangeHandler = this.onTacChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * File input Change handler
   * @param event
   */
  fileChangedHandler(param) {
    //State set
    this.setState({
      bulkFile: {
        file: param.target.files[0],
        name: param.target.files[0].name,
        type: param.target.files[0].type
      }
    }, () => {
      //Validation
      if (this.state.bulkFile.type === "text/plain" || getExtension(this.state.bulkFile.name) === "tsv") {
        this.setState({
          inputError: {
            enabled: false,
            message: ""
          }
        })
      } else {
        this.setState({
          inputError: {
            enabled: true,
            message: i18next.t('errors.invalidFormat')
          }
        })
      }
    })

  }

  /**
   * File input option selected handler
   */
  onFileInputChangeHandler() {
    // console.log(document.getElementById("fileInput"))
    // document.getElementById("fileInput").value = "";

    this.setState({
      showFileInput: true,
      showTac: false,
      bulkFile: {
        file: null,
        name: "",
        type: ""
      }
    });
    this.props.setFieldValue('tac', '')
    this.props.setFieldTouched('tac', false, false)
  }

  /**
   * Tac input option selected handler
   */
  onTacChangeHandler() {
    this.setState({
      showFileInput: false,
      showTac: true
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    //Validation File input
    if (this.state.bulkFile.file) {
      if (this.state.bulkFile.type === "text/plain") {
        this.props.postData(this.state.bulkFile.file)
      } else if (getExtension(this.state.bulkFile.name) === "tsv") {
        this.props.postData(this.state.bulkFile.file)
      } else {
        this.setState({
          inputError: {
            enabled: true,
            message: i18next.t('errors.invalidFormat')
          }
        })
      }
    } else {
      this.setState({
        inputError: {
          enabled: true,
          message: i18next.t('errors.FeildReq')
        }
      })
    }
  }

  render() {
    const {
      handleSubmit,
      disableButton,
      isValid
    } = this.props;
    return (
      <I18n ns="translations">
        {
          (t, {i18n}) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="form-group">
                    <label className="" data-after="&nbsp;*">{t('bulkverify.label')}</label>
                    <div className="asitfield">
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="bulkTabDelimited" name="bulkMethod"
                               onChange={this.onFileInputChangeHandler}
                               className="custom-control-input" value={t('bulkverify.tabDelimitedFile')}
                               checked={this.state.showFileInput}/>
                        <label className="custom-control-label" htmlFor="bulkTabDelimited">
                          {t('bulkverify.tab')}</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="bulkEnterTAC" name="bulkMethod"
                               className="custom-control-input" value={t('enterTheTac')}
                               onChange={this.onTacChangeHandler}/>
                        <label className="custom-control-label" htmlFor="bulkEnterTAC">
                          {t('bulkverify.tac')}</label>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.showFileInput &&
                <div className={this.state.showFileInput ? 'col-md-4 col-sm-6 bulk-show-method-tab'
                  : 'col-md-4 col-sm-6 bulk-method-tab'}>
                  <div className="form-group mb-0">
                    <label className="" htmlFor="verifyIMEI" data-after="&nbsp;*">{t('bulkverify.selectFile')}</label>
                    <div className="asitfield">
                      <input id="fileInput" type="file" name="fileInput"
                             onChange={this.fileChangedHandler}/>
                    </div>
                    {this.state.inputError.enabled &&
                    <span className="error">{this.state.inputError.message}</span>
                    }
                  </div>
                </div>
                }
                {this.state.showTac &&
                <div className={this.state.showTac ? 'col-md-4 col-sm-6 bulk-show-method-tac'
                  : 'col-md-4 col-sm-6 bulk-method-tac'}>
                  <Field class="form-group mb-0" clearError={this.state.clearError} maxLength="8"
                         name="tac" component={renderInput} label={t('bulkverify.enterTheTac')}
                         type="text" placeholder="" requiredStar/>
                </div>
                }
                <div className="col-md-3 col-sm-5">
                  <div className={this.state.showFileInput ? 'form-group DeviceStatusTable_show'
                    : 'form-group DeviceStatusTable_hide'}>
                    <label className="">&nbsp;</label>
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}
                            disabled={disableButton || (!disableButton &&
                              (!(this.state.bulkFile.file !== null) ||
                                this.state.inputError.enabled))}>
                      {t('submit')}</button>
                  </div>
                  <div className={this.state.showTac ? 'form-group DeviceStatusTable_show' :
                    'form-group DeviceStatusTable_hide'}>
                    <label className="">&nbsp;</label>
                    <button className="btn btn-primary btn-block" type="submit"
                            disabled={!(isValid || disableButton) || (isValid && disableButton) ||
                            this.state.inputError.enabled}>{t('submit')}</button>
                  </div>
                </div>
              </div>
            </Form>
          )
        }
      </I18n>
    )
  }
}

/**
 * Formik HOC Enhanced Component
 * @type {React.ComponentType<any>}
 */
export const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({tac: ""}),
  /**
   * Validation
   * @param values
   */
  validate: values => {
    let errors = {};
    // IMEIs Validation
    if (!values.tac) {
      errors.tac = i18next.t('errors.FeildReq')
    } else if (values.tac.length > 8) {
      errors.tac = i18next.t('errors.tacLength')
    } else if (values.tac.length < 8) {
      errors.tac = i18next.t('errors.tacLength')
    }
    if (isNaN(Number(values.tac))) {
      errors.tac = i18next.t('errors.tacType')
    }
    if (/\s/g.exec(values.tac) !== null) {
      errors.tac = i18next.t("errors.enterValidTac")
    }
    return errors;
  },
  handleSubmit: (values, {
    props,
    setSubmitting
  }) => {
    setSubmitting(false);
    props.callServer(values.tac)
  },
  displayName: 'BulkVerifyForm', // helps with React DevTools
})(BulkVerifyForm);

class BulkVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tacData: null,
      loader: false,
      seenWithLoader: false,
      statusData: null,
      statusTable: false,
      clearError: true,
      disableButton: false,
      count: 0,
      alert: {
        enabled: false,
        message: '',
        type: ''
      },
      trackingId: '',
      trackingIds: []
    }
    this.tacPostData = this.tacPostData.bind(this);
    this.postData = this.postData.bind(this);
    this.updateTokenHOC = this.updateTokenHOC.bind(this);
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
   * Post Data to server "Tac selected"
   * Returns: Update state by response or throw error
   * @param param
   */
  tacPostData(config, param) {
    let tac = param
    this.setState({
      disableButton: true,
      alert: {
        enabled: false,
        message: '',
        type: ''
      },
    })
    const formData = new FormData()
    formData.append('tac', tac)
    formData.append('username', this.props.userDetails.preferred_username)
    formData.append('user_id', this.props.userDetails.sub)

   instance.post(`/bulk`, formData, config)
        .then((response) => {
            this.setState({
              disableButton: false
            })
            if(response.data.message === SAME_REQUEST_SPANISH || response.data.message === SAME_REQUEST_ENGLISH || response.data.message === SAME_REQUEST_INDONESIAN){
              SweetAlert({
                title: i18n.t('error'),
                message: response.data.message,
                type: 'error'
              })
              this.setState({trackingId:''})
            }else{
            this.setState({
              trackingId: response.data.task_id,
              alert: {
                enabled: true,
                message: i18n.t('bulkverify.responseMessgae'),
                type: 'success'
              },
            })
            }
          
          })
          .catch((error) => {
            this.setState({
              disableButton: false
            })
            errors(this, error)
          })
      } 
    
  /**
   * Post Data to server "File input selected"
   * Returns: Update state by response or throw error
   * @param file
   */
  postData(config, file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('username', this.props.userDetails.preferred_username)
    formData.append('user_id', this.props.userDetails.sub)
    this.setState({
      disableButton: true,
      alert: {
        enabled: false
      },
    })
      instance.post(`/bulk`, formData, config)
          .then((response) => {
            this.setState({
              disableButton: false,
              trackingId: response.data.task_id,
            })
            this.setState({
              alert: {
                enabled: true,
                message: i18n.t('bulkverify.responseMessgae'),
                type: 'success'
              },
            })
            //Timeout function for Alert
            setTimeout(() => {
              this.setState({
                alert: {
                  enabled: false
                }
              })
            }, 10000);
          })
          .catch((error) => {
            errors(this, error)
            this.setState({
              disableButton: false
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
                  <CardTitle className="card-header">{t('Bulkverify')}</CardTitle>
                  <div className="card-body">
                    <MyEnhancedForm
                      disableButton={this.state.disableButton}
                      postData={(file) => this.updateTokenHOC(this.postData, file)}
                      callServer={(tac) => this.updateTokenHOC(this.tacPostData, tac)}
                    />
                  </div>
                </Card>
                {(this.state.alert.enabled) &&
                <Alert color={this.state.alert.type === "success" ? 'success' : 'danger'}>
                  {this.state.alert.message} 
                  {/* <Route path="/check-status" name="check status" render={() => <CheckStatus /> } />{this.state.alert.type === "success" ? this.state.trackingId : ''} */}
                  <Link
                  to={`/check-status`}>{this.state.alert.type === "success" ? this.state.trackingId : ''}</Link>

                </Alert>
                }
              </div>
            </div>
          )
        }
      </I18n>
    )
  }
}

export default translate('translations')(BulkVerify);

