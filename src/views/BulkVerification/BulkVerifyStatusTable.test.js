/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY"S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import BulkVerifyStatusTable from "./BulkVerifyStatusTable"
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest"
import React from "react";

const mockData = {
  "compliant_report_name": "compliant_report6c2c114c-7bc7-411b-9ad5-05a1dda052b6.tsv",
  "verified_imei": 12,
  "unprocessed_imeis": 0,
  "non_complaint": 12,
  "invalid_imei": 1,
  "count_per_condition": {
    "malformed": 0,
    "not_on_registration_list": 0,
    "local_stolen": 0,
    "gsma_not_found": 0,
    "duplicate": 0,
    "duplicate_large": 0
  },
  "pending_stolen_verification": 0,
  "pending_registration": 0,
  "no_condition": 11
}

describe("Bulk verify status table", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <BulkVerifyStatusTable data={mockData} visible={true}/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <BulkVerifyStatusTable data={mockData} visible={true}/>);
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test("if class adds successfully", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <BulkVerifyStatusTable data={mockData} visible={false}/>);
      </I18nextProvider>
    )
    const dom = wrapper.find(BulkVerifyStatusTable)
    expect(dom.exists('.DeviceStatusTable_hide')).toBe(true);
  })
  test("if receives props correctly", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <BulkVerifyStatusTable data={mockData} visible={true}/>);
      </I18nextProvider>
    )
    expect(wrapper.find(BulkVerifyStatusTable).props().visible).toBe(true)
    const verifiedImei = wrapper.find(BulkVerifyStatusTable).props().data.verified_imei
    const invalidImei = wrapper.find(BulkVerifyStatusTable).props().data.invalid_imei
    expect(verifiedImei).toEqual(12)
    expect(invalidImei).toEqual(1)
  });
})