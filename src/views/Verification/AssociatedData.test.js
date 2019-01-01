/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY"S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import AssociatedData from "./AssociatedData"
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest"

const mockData = [
  {
    "imsi": "410018018109668",
    "last_seen": "2018-05-12"
  }
]
const mockTitle = "SomeTitle"

describe("Associated Data table", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <AssociatedData data={mockData} title={mockTitle}/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <AssociatedData data={mockData} title={mockTitle}/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test("if titles renders successfully", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <AssociatedData data={mockData} title={mockTitle}/>
      </I18nextProvider>
    )
    expect(wrapper.contains(<b>SomeTitle</b>)).toBe(true);
  });
  test("if renders as mock data", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <AssociatedData data={mockData} title={mockTitle}/>
      </I18nextProvider>
    )
    const rows = wrapper.find("tr")
    // console.log(rows.debug())
    const columns = wrapper.find("td")
    // console.log(columns.debug())
    expect(wrapper.find(AssociatedData).props().title).toEqual("SomeTitle")
    // console.log(wrapper.find(SeenWithTable).debug())
    expect(rows.length).toEqual(2);
    expect(columns.length).toEqual(2);
    expect(rows.at(0).find("th").at(0).text()).toEqual("IMSI")
    expect(rows.at(0).find("th").at(1).text()).toEqual("pairs.lastseen")
    expect(rows.at(1).find("td").at(0).text()).toEqual("410018018109668")
    expect(rows.at(1).find("td").at(1).text()).toEqual("2018-05-12")
  });
})