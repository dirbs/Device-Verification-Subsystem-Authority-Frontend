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
import React from 'react';
import { translate, I18n } from 'react-i18next';

/**
 * React functional (presentational) component shows Bulk Status details
 * @param visible, data
 * @returns Table consists of Bulk Status information wrapped in Div
 * @constructor
 */
const BulkVerifyStatusTable = ({
   ...props
}) => {
    return (
        <I18n ns="translations">
        {
        (t) => (
        <div>
        { props.data &&
            <div className={props.visible ? 'DeviceStatusTable_show mb-2' : 'DeviceStatusTable_hide'}>
                <div className="card-body p0 mt-2">
                <div className="react-bs-table-container">
                <div className="table-responsive">
                    <table className="table table-sm table-bordered table-status mb-0">
                        <tbody>
                        <tr>
                            <th>{t('bulkverify.table.totalIMEI')}</th>
                            <td>{props.data.verified_imei}</td>
                        </tr>
                        <tr>
                            <th>{t('bulkverify.table.invalidIMEI')}</th>
                            <td>{props.data.invalid_imei}</td>
                        </tr>
                        <tr>
                            <th>{t('bulkverify.table.nonCompliant')}</th>
                            <td>{props.data.non_complaint}</td>
                        </tr>
                        <tr>
                            <th>{t('deviceStatusTable.state')}</th>
                            <td className='bg-point-03'>
                                <table className="table table-sm table-striped table-border-none table-bg-none mb-0">
                                    <tbody>
                                    {
                                        Object.entries(props.data.count_per_condition).map(([key, value]) => (
                                        <tr key={key}>
                                            <th>{key}</th>
                                            <td>{value}</td>
                                        </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th>{t('bulkverify.table.pending')}</th>
                            <td>{props.data.pending_registration}</td>
                        </tr>
                        <tr>
                            <th>{t('bulkverify.table.stolen')}</th>
                            <td>{ props.data.pending_stolen_verification}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            </div>
        }
        </div>
        )
        }
        </I18n>
        )
    };
export default translate('translations')(BulkVerifyStatusTable);