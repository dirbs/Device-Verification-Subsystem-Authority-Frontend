/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY"S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import VerifyImei from "./VerifyImei"
import VerifyImeiForm from "./VerifyImei"
import MyEnhancedForm from "./VerifyImei"
import DeviceStatusTable from "./DeviceStatusTable"
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest"
import React from "react";
import axios from 'axios'
import mockAxios from 'jest-mock-axios';
import {ToastContainer, toast} from 'react-toastify';

//Jest timer
jest.useFakeTimers();

const mockDeviceStatusTableData = {
  "pairs": {
    "count": 0,
    "data": [],
    "start": 1,
    "limit": 6
  },
  "stolen_status": "No report",
  "classification_state": {
    "blocking_conditions": [
      {
        "condition_name": "gsma_not_found",
        "condition_met": false
      },
      {
        "condition_name": "local_stolen",
        "condition_met": false
      },
      {
        "condition_name": "not_on_registration_list",
        "condition_met": true
      },
      {
        "condition_name": "duplicate",
        "condition_met": false
      },
      {
        "condition_name": "duplicate_large",
        "condition_met": false
      },
      {
        "condition_name": "malformed",
        "condition_met": false
      }
    ],
    "informative_conditions": []
  },
  "imei": "35738006235378",
  "subscribers": {
    "count": 1,
    "data": [
      {
        "msisdn": "923305473662",
        "imsi": "410035125467956",
        "last_seen": "2018-05-15"
      }
    ],
    "start": 1,
    "limit": 6
  },
  "registration_status": "Not registered",
  "compliant": {
    "status": "Non compliant",
    "block_date": "N/A"
  },
  "gsma": {
    "model_name": "SM-G530H/DS",
    "brand": "Samsung",
    "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
    "operating_system": null,
    "model_number": "Samsung SM-G530H/DS",
    "device_type": "Smartphone",
    "manufacturer": "Samsung Korea"
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

describe("Verify IMEI Main Component", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <VerifyImei>
        <MyEnhancedForm disableButton={true} callServer={() => {
        }}/>
        <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                           classificationStates={mockClassificationState}/>
      </VerifyImei>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <VerifyImei>
          <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                             classificationStates={mockClassificationState}/>
        </VerifyImei>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test("if API calls and render components", () => {
    const mockSubscribers = {
      count: 0,
      limit: 6,
      start: 1,
      data: []
    }
    const mockPairs = {count: 0, limit: 6, start: 1, data: []}
    const mockClassState = {
      informative_conditions: [{
        condition_name: "duplicate_compound",
        condition_met: false
      }],
      blocking_conditions: [
        {
          condition_name: "not_on_registration_list",
          condition_met: false
        },
        {condition_name: "on_local_stolen_list", condition_met: false}, {
          condition_name: "gsma_not_found",
          condition_met: false
        }]
    };
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImei kc={mockKcProps}>
          <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                             classificationStates={mockClassificationState}/>
        </VerifyImei>
      </I18nextProvider>
    )

    const input = wrapper.find('input')
    input.simulate('change', {
      target: {
        name: 'imei',
        value: '12345678911234'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    let responseFulstatus = {
      data: {
        "compliant": {"block_date": "N/A", "status": "Non compliant"},
        "gsma": {
          "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
          "device_type": "Smartphone",
          "model_number": "Samsung SM-G530H/DS",
          "operating_system": null,
          "model_name": "SM-G530H/DS",
          "brand": "Samsung",
          "manufacturer": "Samsung Korea"
        },
        "imei": "35738006235378",
        "registration_status": "Not registered",
        "pairs": mockPairs,
        "classification_state": mockClassState,
        "stolen_status": "No report",
        "subscribers": mockSubscribers
      },
      response: {
        status: 404,
        data: {
          message: 'iam error message'
        }
      },
      status: 200
    }
    mockAxios.mockResponse(responseFulstatus)

    wrapper.update()
    // console.log(wrapper.debug())
    expect(wrapper.find('VerifyImei').state().subscribers).toEqual(mockSubscribers)
    expect(wrapper.find('VerifyImei').state().pairs).toEqual(mockPairs)
    expect(wrapper.find('SeenWithTable').length).toEqual(1)
    expect(wrapper.find('DeviceStatusTable').length).toEqual(1)
  });
  test("if API error handle correctly", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImei kc={mockKcProps}>
          <DeviceStatusTable data={mockDeviceStatusTableData} visible={true}
                             classificationStates={mockClassificationState}/>
        </VerifyImei>
      </I18nextProvider>
    )

    const input = wrapper.find('input')
    input.simulate('change', {
      target: {
        name: 'imei',
        value: '12345678911234'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    let responseFulstatus = {
      data: {},
      response: {
        status: 404,
        data: {
          message: 'iam error message'
        }
      },
      status: 200
    }
    mockAxios.mockError(responseFulstatus)

    wrapper.update()
    expect(wrapper.find('VerifyImei').state().loader).toBe(false)
    expect(wrapper.find('VerifyImei').state().showDeviceStatusTable).toBe(false)
    expect(wrapper.find('VerifyImei').state().showPairsTable).toBe(false)
    expect(wrapper.find('VerifyImei').state().pairsLoader).toBe(false)
    expect(wrapper.find('VerifyImei').state().showSubscribersTable).toBe(false)
    expect(wrapper.find('VerifyImei').state().subscribersLoader).toBe(false)
    expect(wrapper.find('VerifyImei').state().disableButton).toBe(false)
  });

  test("if Paginating Subscribers table renders data correctly", () => {
    const fn = jest.fn();
    toast.onChange(fn);

    const mockSubscribers = {
      "count": 10,
      "limit": 6,
      "start": 1,
      "data": [
        {"msisdn": "223000000000018", "last_seen": "2017-10-30", "imsi": "111010000000001"},
        {"msisdn": "223000000000018", "last_seen": "2017-11-30", "imsi": "111010000000002"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000003"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000004"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000005"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000006"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000007"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000008"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000009"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000000"}
      ]
    }
    const mockSubscribersFromSecondPage = {
      "count": 10,
      "limit": 6,
      "start": 6,
      "data": [
        {"msisdn": "223000000000018", "last_seen": "2017-10-30", "imsi": "111010000000001"},
        {"msisdn": "223000000000018", "last_seen": "2017-11-30", "imsi": "111010000000002"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000003"},
        {"msisdn": "223000000000018", "last_seen": "2017-12-30", "imsi": "111010000000004"},
      ]
    }
    const mockPairs = {
      "count": 10,
      "limit": 6,
      "start": 1,
      "data": [
        {"last_seen": "2017-10-30", "imsi": "111010000000001"},
        {"last_seen": "2017-11-30", "imsi": "111010000000002"},
        {"last_seen": "2017-12-30", "imsi": "111010000000003"},
        {"last_seen": "2017-12-30", "imsi": "111010000000004"},
        {"last_seen": "2017-12-30", "imsi": "111010000000005"},
        {"last_seen": "2017-12-30", "imsi": "111010000000006"},
        {"last_seen": "2017-12-30", "imsi": "111010000000007"},
        {"last_seen": "2017-12-30", "imsi": "111010000000008"},
        {"last_seen": "2017-12-30", "imsi": "111010000000009"},
        {"last_seen": "2017-12-30", "imsi": "111010000000000"}
      ]
    }
    const mockClassState = {
      informative_conditions: [{
        condition_name: "duplicate_compound",
        condition_met: false
      }],
      blocking_conditions: [
        {
          condition_name: "not_on_registration_list",
          condition_met: false
        },
        {condition_name: "on_local_stolen_list", condition_met: false}, {
          condition_name: "gsma_not_found",
          condition_met: false
        }]
    };
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImei kc={mockKcProps}/>
      </I18nextProvider>
    )

    const input = wrapper.find('input')
    input.simulate('change', {
      target: {
        name: 'imei',
        value: 11111111111111
      }
    })
    // console.log(wrapper.find('Formik').debug())
    wrapper.find('form').simulate('submit')

    let responseFulstatus = {
      data: {
        "compliant": {"block_date": "N/A", "status": "Non compliant"},
        "gsma": {
          "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
          "device_type": "Smartphone",
          "model_number": "Samsung SM-G530H/DS",
          "operating_system": null,
          "model_name": "SM-G530H/DS",
          "brand": "Samsung",
          "manufacturer": "Samsung Korea"
        },
        "imei": "35738006235378",
        "registration_status": "Not registered",
        "pairs": {
          "count": 0,
          "limit": 6,
          "start": 1,
          "data": []
        },
        "classification_state": mockClassState,
        "stolen_status": "No report",
        "subscribers": mockSubscribers
      },
      status: 200
    }
    mockAxios.mockResponse(responseFulstatus)
    wrapper.update()

    //Get Pagination link to 2nd page
    wrapper.find({totalItemsCount:10}).find({pageText:"2"}).simulate('click')

    //API call after pagination
    responseFulstatus = {
      data: {
        "compliant": {"block_date": "N/A", "status": "Non compliant"},
        "gsma": {
          "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
          "device_type": "Smartphone",
          "model_number": "Samsung SM-G530H/DS",
          "operating_system": null,
          "model_name": "SM-G530H/DS",
          "brand": "Samsung",
          "manufacturer": "Samsung Korea"
        },
        "imei": "35738006235378",
        "registration_status": "Not registered",
        "pairs": {
          "count": 0,
          "limit": 6,
          "start": 1,
          "data": []
        },
        "classification_state": mockClassState,
        "stolen_status": "No report",
        "subscribers": mockSubscribersFromSecondPage
      },
      status: 200
    }
    mockAxios.mockResponse(responseFulstatus)
    wrapper.update()

    //Test
    expect(wrapper.find({totalItemsCount:10}).find({pageText:"2"}).props().isActive).toBe(true)

    //Error case
    wrapper.find({totalItemsCount:10}).find({pageText:"1"}).simulate('click')
    //API call after pagination
    let mockErrorResponse = {
      response: {
        status: 404,
        data: {
          message: 'iam error message'
        }
      },
      status: 404
    }
    mockAxios.mockError(mockErrorResponse)
    wrapper.update()

    //Tests
    jest.runAllTimers();
    expect(fn).toHaveBeenCalled()
  });
  test("if Paginating Pairs table renders data correctly", () => {
    const fn = jest.fn();
    toast.onChange(fn);

    const mockPairs = {
      "count": 10,
      "limit": 6,
      "start": 1,
      "data": [
        {"last_seen": "2017-10-30", "imsi": "111010000000001"},
        {"last_seen": "2017-11-30", "imsi": "111010000000002"},
        {"last_seen": "2017-12-30", "imsi": "111010000000003"},
        {"last_seen": "2017-12-30", "imsi": "111010000000004"},
        {"last_seen": "2017-12-30", "imsi": "111010000000005"},
        {"last_seen": "2017-12-30", "imsi": "111010000000006"},
        {"last_seen": "2017-12-30", "imsi": "111010000000007"},
        {"last_seen": "2017-12-30", "imsi": "111010000000008"},
        {"last_seen": "2017-12-30", "imsi": "111010000000009"},
        {"last_seen": "2017-12-30", "imsi": "111010000000000"}
      ]
    }
    const mockPairsSecondPage = {
      "count": 10,
      "limit": 6,
      "start": 2,
      "data": [
        {"last_seen": "2017-10-30", "imsi": "111010000000001"},
        {"last_seen": "2017-11-30", "imsi": "111010000000002"},
        {"last_seen": "2017-12-30", "imsi": "111010000000003"},
        {"last_seen": "2017-12-30", "imsi": "111010000000004"}
      ]
    }
    const mockClassState = {
      informative_conditions: [{
        condition_name: "duplicate_compound",
        condition_met: false
      }],
      blocking_conditions: [
        {
          condition_name: "not_on_registration_list",
          condition_met: false
        },
        {condition_name: "on_local_stolen_list", condition_met: false}, {
          condition_name: "gsma_not_found",
          condition_met: false
        }]
    };
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImei kc={mockKcProps}/>
      </I18nextProvider>
    )

    const input = wrapper.find('input')
    input.simulate('change', {
      target: {
        name: 'imei',
        value: 11111111111111
      }
    })
    wrapper.find('form').simulate('submit')

    let responseFulstatus = {
      data: {
        "compliant": {"block_date": "N/A", "status": "Non compliant"},
        "gsma": {
          "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
          "device_type": "Smartphone",
          "model_number": "Samsung SM-G530H/DS",
          "operating_system": null,
          "model_name": "SM-G530H/DS",
          "brand": "Samsung",
          "manufacturer": "Samsung Korea"
        },
        "imei": "35738006235378",
        "registration_status": "Not registered",
        "pairs": mockPairs,
        "classification_state": mockClassState,
        "stolen_status": "No report",
        "subscribers": {
          "count": 0,
          "limit": 6,
          "start": 1,
          "data": []
        }
      },
      status: 200
    }
    mockAxios.mockResponse(responseFulstatus)
    wrapper.update()

    //Get Pagination link to 2nd page
    wrapper.find({totalItemsCount:10}).find({pageText:"2"}).simulate('click')

    //API call after pagination
    responseFulstatus = {
      data: {
        "compliant": {"block_date": "N/A", "status": "Non compliant"},
        "gsma": {
          "radio_access_technology": "GSM 1800,GSM 1900,GSM 900,GSM850 (GSM800),WCDMA FDD Band I,WCDMA FDD Band II,WCDMA FDD Band V,WCDMA FDD Band VIII",
          "device_type": "Smartphone",
          "model_number": "Samsung SM-G530H/DS",
          "operating_system": null,
          "model_name": "SM-G530H/DS",
          "brand": "Samsung",
          "manufacturer": "Samsung Korea"
        },
        "imei": "35738006235378",
        "registration_status": "Not registered",
        "pairs": mockPairsSecondPage,
        "classification_state": mockClassState,
        "stolen_status": "No report",
        "subscribers": {
          "count": 0,
          "limit": 6,
          "start": 1,
          "data": []
        }
      },
      status: 200
    }
    mockAxios.mockResponse(responseFulstatus)
    wrapper.update()

    //Test
    expect(wrapper.find({totalItemsCount:10}).find({pageText:"2"}).props().isActive).toBe(true)

    //Error case
    wrapper.find({totalItemsCount:10}).find({pageText:"1"}).simulate('click')
    //API call after pagination
    let mockErrorResponse = {
      response: {
        status: 404,
        data: {
          message: 'iam error message'
        }
      },
      status: 404
    }
    mockAxios.mockError(mockErrorResponse)
    wrapper.update()

    //Tests
    jest.runAllTimers();
    expect(fn).toHaveBeenCalled()
  });
})

describe("Verify IMEI form component", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <VerifyImeiForm/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  test("if form has a submit button", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm/>
      </I18nextProvider>
    )
    const button = wrapper.find("button")
    expect(button.length).toEqual(1)
  })
  test("if submit button has a text", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm/>
      </I18nextProvider>
    )
    const button = wrapper.find("button")
    expect(button.text()).toEqual("Submit")
  })
  test("if form submit is disabled with empty value", () => {
    const spy = Sinon.spy()
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm onSubmit={spy}/>
      </I18nextProvider>
    )
    const input = wrapper.find("input")
    input.simulate("change", {
      target: {
        name: "imei",
        value: ''
      }
    })
    expect(wrapper.find("button").props().disabled).toBe(true);
  })
  test("if form submit is disabled with wrong imei", () => {
    const spy = Sinon.spy()
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm onSubmit={spy}/>
      </I18nextProvider>
    )
    const input = wrapper.find("input")
    const form = wrapper.find("form")
    input.simulate("change", {
      target: {
        name: "imei",
        value: "asdasdsdasdasdas"
      }
    })
    form.simulate("submit")
    expect(wrapper.find("button").props().disabled).toBe(true);
  })
  test("if form submit is enabled with correct imei", () => {
    const spy = Sinon.spy()
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <VerifyImeiForm onSubmit={spy}/>
      </I18nextProvider>
    )
    const input = wrapper.find("input")
    input.simulate("change", {
      target: {
        name: "imei",
        value: "1111111111111111"
      }
    })
    expect(wrapper.find("button").props().disabled).toBe(false);
  })
})