/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import VerifyImei from './VerifyImei'
import VerifyImeiForm from './VerifyImei'
import MyEnhancedForm from './VerifyImei'
import DeviceStatusTable from './DeviceStatusTable'
import { I18nextProvider } from 'react-i18next';
import i18n from './../../i18nTest'

const mockDeviceStatusTableData = {
  "pairs":{
    "count":0,
    "data":[

    ],
    "start":1,
    "limit":6
  },
  "stolen_status":"No report",
  "classification_state":{
    "blocking_conditions":[
      {
        "condition_name":"gsma_not_found",
        "condition_met":false
      },
      {
        "condition_name":"local_stolen",
        "condition_met":false
      },
      {
        "condition_name":"not_on_registration_list",
        "condition_met":true
      },
      {
        "condition_name":"duplicate",
        "condition_met":false
      },
      {
        "condition_name":"duplicate_large",
        "condition_met":false
      },
      {
        "condition_name":"malformed",
        "condition_met":false
      }
    ],
    "informative_conditions":[

    ]
  },
  "imei":"35738006235378",
  "subscribers":{
    "count":1,
    "data":[
      {
        "msisdn":"923305473662",
        "imsi":"410035125467956",
        "last_seen":"2018-05-15"
      }
    ],
    "start":1,
    "limit":6
  },
  "registration_status":"Not registered",
  "compliant":{
    "status":"Non compliant",
    "block_date":"N/A"
  },
  "gsma":{
    "model_name":"SM-G530H/DS",
    "brand":"Samsung",
    "radio_access_technology":"GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
    "operating_system":null,
    "model_number":"Samsung SM-G530H/DS",
    "device_type":"Smartphone",
    "manufacturer":"Samsung Korea"
  }
}
const mockClassificationState = [
  {
    condition_met: false,
    condition_name: "gsma_not_found"
  },
  {
    condition_met: false,
    condition_name: "local_stolen"
  },
  {
    condition_met: true,
    condition_name: "not_on_registration_list"
  },
  {
    condition_met: false,
    condition_name: "duplicate"
  },
  {
    condition_met: false,
    condition_name: "duplicate_large"
  },
  {
    condition_met: false,
    condition_name: "malformed"
  },
]

describe('Verify IMEI Main Component',()=>{
  test('if renders correctly',()=>{
    const wrapper = shallow(
      <VerifyImei>
        <MyEnhancedForm disableButton={true} callServer={() => {}}/>
        <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                           classificationStates={mockClassificationState} />
      </VerifyImei>);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <VerifyImei>
          <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                             classificationStates={mockClassificationState} />
        </VerifyImei>
      </I18nextProvider>
      )
      expect(wrapper).toMatchSnapshot()
  });
})

describe('Device Status Table',()=>{
  test('if renders correctly',()=>{
    const wrapper = shallow(
      <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                         classificationStates={mockClassificationState} />);
    expect(wrapper).toMatchSnapshot()
  })
  test('if renders correctly again', () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
          <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                             classificationStates={mockClassificationState} />
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
})