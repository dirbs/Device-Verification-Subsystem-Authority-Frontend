/*
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the 
disclaimer below) provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer 
      in the documentation and/or other materials provided with the distribution.
    * Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote 
      products derived from this software without specific prior written permission.
    * The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use 
      this software in a product, an acknowledgment is required by displaying the trademark/log as per the details provided 
      here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
    * Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
    * This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED 
BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import React from 'react';
import { translate, I18n } from 'react-i18next';
import { Card, CardHeader, CardBody } from 'reactstrap';

/**
 * React functional (presentational) component shows IMEI Status details
 * @param visible, data
 * @returns Table consists of IMEI Status information wrapped in Div
 * @constructor
 */
const DeviceStatusTable = ({
   ...props
}) => {
    return (
        <I18n ns="translations">
        {
        (t) => (
        <div>
        { props.data &&
            <Card className={props.visible ? 'DeviceStatusTable_show' : 'DeviceStatusTable_hide'}>
                <CardHeader>{t('deviceStatusTable.title')}</CardHeader>
                <CardBody>
                    <h6 className="mt-3"><b>{t('heading.status')}</b></h6>
                    <table className="table table-sm table-bordered table-status mb-0">
                        <tbody>
                        <tr>
                            <th>{t('heading.status')}</th>
                            <td>{props.data.imei}</td>
                        </tr>
                        { props.data.compliant &&
                        <tr>
                            <th>{t('deviceStatusTable.complianceStatus')}</th>
                            <td>{props.data.compliant.status ? props.data.compliant.status: 'N/A'}</td>
                        </tr>
                        }
                        <tr>
                            <th>{t('deviceStatusTable.regStatus')}</th>
                            <td>{props.data.registration_status}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.lostStolenStatus')}</th>
                            <td>{props.data.stolen_status}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.date')}</th>
                            <td>{props.data.compliant.block_date}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h6 className="mt-4"><b>{t('heading.deviceInformation')}</b></h6>
                    <table className="table table-sm table-bordered table-status mb-0">
                        <tbody>
                        <tr>
                            <th>{t('deviceStatusTable.brand')}</th>
                            <td>{(props.data.gsma && props.data.gsma.brand) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.modelName')}</th>
                            <td>{(props.data.gsma && props.data.gsma.model_name) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.modelNumber')}</th>
                            <td>{(props.data.gsma && props.data.gsma.model_number) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.manufacturer')}</th>
                            <td>{(props.data.gsma && props.data.gsma.manufacturer) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.type')}</th>
                            <td>{(props.data.gsma && props.data.gsma.device_type) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.os')}</th>
                            <td>{(props.data.gsma && props.data.gsma.operating_system) || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.tech')}</th>
                            <td>{(props.data.gsma && props.data.gsma.radio_access_technology) || 'N/A'}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h6 className="mt-4"><b>{t('deviceStatusTable.state')}</b></h6>
                    <table className="table table-sm table-bordered table-status mb-0">
                        <tbody>
                            {props.classificationStates.map((condition,index)=>{
                                return <tr key={index}>
                                    <th>{condition.condition_name}</th>
                                    <td>{condition.condition_met ? 'True' : 'False'}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        }
        </div>
        )
        }
        </I18n>
        )
    };
export default translate('translations')(DeviceStatusTable);