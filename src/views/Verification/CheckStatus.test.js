import {StatusCollapse} from "./CheckStatus"
import CheckStatus from "./CheckStatus"
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest"
import React from "react";
import mockAxios from 'jest-mock-axios';
import {toast} from "react-toastify";
import FileSaver from "file-saver";

//Mock File-saver
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
global.Blob = function (content, options){return  ({content, options})}

//Jest timer
jest.useFakeTimers();

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});
describe("Check status component", () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    // localStorage.count = 1;
    localStorage.tracking_ids = JSON.stringify([])
  });
  test("if renders correctly", () => {
    const wrapper = shallow(<CheckStatus/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <CheckStatus/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  /* test("if componentDidMount renders values correctly", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <CheckStatus/>
      </I18nextProvider>);
    expect(localStorage.getItem).toBeCalledWith('tracking_ids')
    //expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    //Component should reflect the localStorage
    //expect(wrapper.find('CheckStatus').state().noIds).toBe(true)
    //expect(wrapper.find('CheckStatus').state().tracking_ids.length).toBe(0)
    //No Results found HTML to be found
    //expect(wrapper.contains(<div className="nodata">No Results found</div>)).toBe(true)
  }) */
}) 

describe("Check status component with tracking Ids", () => {
  beforeEach(() => {
    mockAxios.reset()
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    // localStorage.count = 1;
    localStorage.tracking_ids = JSON.stringify([
      {
        id: "84601c00-cbb1-4e58-9f70-d05e1264c4f9",
        created_at: "14/11/2018, 12:11:53",
        term: "TAC: 12312323"
      },
      {
        id: "84601c00-cbb1-4e58-9f70-d05e1264c4f9",
        created_at: "14/11/2018, 12:11:53",
        term: "TAC: 12312323"
      }
    ])
  });
  test("if toggle with PENDING status", () => {
    const fn = jest.fn();
    toast.onChange(fn);

    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <CheckStatus kc={mockKcProps}/>
      </I18nextProvider>);

    //State PENDING
    //Check status button
   // wrapper.find('Button')
    //API call mock
    let statusResponse = {
      data: {
        result: {
          pending_stolen_verification: 1,
          non_complaint: 5,
          unprocessed_imeis: 0,
          compliant_report_name: "compliant_report25f67545-739a-4deb-8262-3749a9fe71fa.tsv",
          verified_imei: 12,
          pending_registration: 0,
          count_per_condition: {
            on_local_stolen_list: 2,
            gsma_not_found: 0,
            not_on_registration_list: 0,
            duplicate_compound: 0
          },
          no_condition: 2,
          invalid_imei: 1
        },
        state: "PENDING"
      },
      status: 200
    }
  //  mockAxios.mockResponse(statusResponse)
    wrapper.update()

    //Tests
    jest.runAllTimers();
    //expect(fn).toHaveBeenCalled()
  //  expect(wrapper.find('StatusCollapse').at(0).state().status).toEqual('PENDING')

    //State SUCCESS
    //Check status button
  //  wrapper.find('StatusCollapse').at(0).find('button').simulate('click')
    //API call mock
    statusResponse = {
      data: {
        result: {
          pending_stolen_verification: 1,
          non_complaint: 5,
          unprocessed_imeis: 0,
          compliant_report_name: "report not generated.",
          verified_imei: 12,
          pending_registration: 0,
          count_per_condition: {
            on_local_stolen_list: 2,
            gsma_not_found: 0,
            not_on_registration_list: 0,
            duplicate_compound: 0
          },
          no_condition: 2,
          invalid_imei: 1
        },
        state: "SUCCESS"
      },
      status: 200
    }
  //  mockAxios.mockResponse(statusResponse)
    wrapper.update()
   /*  expect(wrapper.find('StatusCollapse').at(0).state().status).toEqual('SUCCESS')
    expect(wrapper.find('StatusCollapse').at(0).state().hasReport).toEqual(false)
    expect(wrapper.find('StatusCollapse').at(0).state().fileName).toEqual('') */
  })
  test("if download report", () => {
    const fn = jest.fn();
    toast.onChange(fn);

    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <CheckStatus kc={mockKcProps}/>
      </I18nextProvider>);

    //Already opened
    //Check status button
 //   wrapper.find('StatusCollapse').at(0).find('button').simulate('click')
    //API call mock
    let reportName = "compliant_report25f67545-739a-4deb-8262-3749a9fe71fa.tsv"
    let statusResponse = {
      data: {
        result: {
          pending_stolen_verification: 1,
          non_complaint: 5,
          unprocessed_imeis: 0,
          compliant_report_name: reportName,
          verified_imei: 12,
          pending_registration: 0,
          count_per_condition: {
            on_local_stolen_list: 2,
            gsma_not_found: 0,
            not_on_registration_list: 0,
            duplicate_compound: 0
          },
          no_condition: 2,
          invalid_imei: 1
        },
        state: "SUCCESS"
      },
      status: 200
    }
 //   mockAxios.mockResponse(statusResponse)
    wrapper.update()

    //Tests
    /* expect(wrapper.find('StatusCollapse').at(0).state().hasReport).toEqual(true)
    expect(wrapper.find('StatusCollapse').at(0).state().fileName).toEqual(reportName) */

  //  wrapper.find('Collapse').find({isOpen:true}).find('button').simulate('click')
    let reportResponse = {
      data: ['Test'],
      status: 200
    }
   // mockAxios.mockResponse(reportResponse)

    //Test
 //   expect(FileSaver.saveAs).toBeCalled()
  })
  test("if toggle collapse correctly", () => {
    const fn = jest.fn();
    toast.onChange(fn);

    /* const wrapper = mount(
    <CheckStatus kc={mockKcProps}/> ); */
    //Check status button
 //   wrapper.find('StatusCollapse').at(0).find('button').simulate('click')
    //API call mock
    let reportName = "compliant_report25f67545-739a-4deb-8262-3749a9fe71fa.tsv"
    let statusResponse = {
      data: {
        result: {
          pending_stolen_verification: 1,
          non_complaint: 5,
          unprocessed_imeis: 0,
          compliant_report_name: reportName,
          verified_imei: 12,
          pending_registration: 0,
          count_per_condition: {
            on_local_stolen_list: 2,
            gsma_not_found: 0,
            not_on_registration_list: 0,
            duplicate_compound: 0
          },
          no_condition: 2,
          invalid_imei: 1
        }
      },
      status: 200
    }
  //  mockAxios.mockResponse(statusResponse)
 //   wrapper.update()
    //Toggle again
 //   wrapper.find('StatusCollapse').at(0).find('button').at(0).simulate('click')

    //Tests
 //   expect(wrapper.find('StatusCollapse').at(0).find('Collapse').props().isOpen).toBe(false)
  })
})
describe("Status collapse component", () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    localStorage.tracking_ids = JSON.stringify([
      {
        id: "84601c00-cbb1-4e58-9f70-d05e1264c4f9",
        created_at: "14/11/2018, 12:11:53",
        term: "TAC: 12312323"
      },
      {
        id: "84601c00-cbb1-4e58-9f70-d05e1264c4f9",
        created_at: "14/11/2018, 12:11:53",
        term: "TAC: 11111111"
      }
    ])
  });
  test("if renders correctly", () => {
    const wrapper = shallow(<StatusCollapse/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <StatusCollapse/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });

 /*  test("if props renders correctly for StatusCollapse", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <CheckStatus>
          <StatusCollapse/>
        </CheckStatus>
      </I18nextProvider>
    ) 
    let StatusProps = wrapper.find('StatusCollapse').at(0).props()
    expect(StatusProps.term).toEqual('TAC: 12312323')
    expect(StatusProps.created).toEqual('14/11/2018, 12:11:53')
    expect(StatusProps.value).toEqual('84601c00-cbb1-4e58-9f70-d05e1264c4f9')

    StatusProps = wrapper.find('StatusCollapse').at(1).props()
    expect(StatusProps.term).toEqual('TAC: 11111111')
    expect(StatusProps.created).toEqual('14/11/2018, 12:11:53')
    expect(StatusProps.value).toEqual('84601c00-cbb1-4e58-9f70-d05e1264c4f9')
  }); */
 /*  test("if State renders correctly for StatusCollapse", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <CheckStatus>
          <StatusCollapse/>
        </CheckStatus>
      </I18nextProvider>
    )
    let StatusState = wrapper.find('StatusCollapse').at(0).state()
    expect(StatusState.collapse).toBe(false)
    expect(StatusState.status).toBe('PENDING')
    expect(StatusState.statusTable).toBe(false)
    expect(StatusState.statusData).toBe(null)
  }); */
  /* test("if StatusCollapse has CheckStatus button", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <CheckStatus/>
      </I18nextProvider>
    )
    const StatusCollapse = wrapper.find('StatusCollapse').at(0)
    expect(StatusCollapse.find('button').hasClass('btn btn-primary')).toBe(true)
  }); */
})
