/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import React from 'react';
import { I18n } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

/**
 * React functional (presentational) component shows Pairs details
 * @param title, data
 * @returns Table consists of Pairs information wrapped in Div
 * @constructor
 */
const AssociatedData = ({
                           ...props
                       }) => {
    return (
        <I18n ns="translations">
            {
                (t) => (
                    <div>
                        {}
                        <div className="card">
                            <div className="card-header"><b>{props.title}</b></div>
                            <div className="card-body p0">
                                <div className="react-bs-table-container">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-bordered mb-0">
                                            <thead>
                                            <tr>
                                                <th>IMSI</th>
                                                <th>{t('pairs.lastseen')}</th>
                                            </tr>
                                            </thead>
                                            { (props.data.length > 0 &&
                                            <tbody>
                                                {
                                                    props.data.map((value, i) => (
                                                        <tr key={i}>
                                                            <td>{value.imsi}</td>
                                                            <td>{value.last_seen}</td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>) ||
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={2} style={{'textAlign':'center'}}>No information</td>
                                                    </tr>
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </I18n>
    )
};

export default AssociatedData;
