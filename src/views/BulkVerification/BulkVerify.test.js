import BulkVerify from "./BulkVerify"
import {MyEnhancedForm} from "./BulkVerify"
import {I18nextProvider} from "react-i18next";
import i18n from "./../../i18nTest"
import mockAxios from 'jest-mock-axios';
import {BrowserRouter as Router} from 'react-router-dom';

const userDetails = {
  preferred_username: "User"
}

const mockFile = {
  'file': {
    'data': 'mockData'
  },
  'name': "bulk_dvs.tsv",
  'type': "png"
}
//Jest timer
jest.useFakeTimers();

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

describe("Bulk verify component", () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    localStorage.count = 1;
    localStorage.tracking_ids = JSON.stringify(
      [
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
      ]
    )
  });
  test("if renders correctly", () => {
    const wrapper = shallow(
      <BulkVerify/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <BulkVerify/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if TAC validation works correctly', () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <BulkVerify kc={mockKcProps}/>
        </I18nextProvider>
      </Router>
    )
    //Get instance of BulkVerify Component
    const instance = wrapper.find('BulkVerify').instance()
    //Added Spy function to tacPostData
    Sinon.spy(instance, 'tacPostData')
    const form = wrapper.find('BulkVerifyForm')
    //SetState to show Tac field
    form.setState({
      showTac: true,
      showFileInput: false
    })
    wrapper.update()
    //Find Form and Submit button
    let updatedForm = wrapper.find('BulkVerifyForm')
    let tacInput = updatedForm.find('input').at(2)
    //Simulate Input Value
    tacInput.simulate("change", {
      target: {
        value: '111111111',
        name: 'tac'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')

    //Test
    expect(wrapper.find('Formik').state().errors.tac).toEqual('The Tac must be a 8 digits number')

    //Find Form and Submit button
    updatedForm = wrapper.find('BulkVerifyForm')
    tacInput = updatedForm.find('input').at(2)
    //Simulate Input Value
    tacInput.simulate("change", {
      target: {
        value: '11111',
        name: 'tac'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')

    //Test
    expect(wrapper.find('Formik').state().errors.tac).toEqual('The Tac must be a 8 digits number')

    //Find Form and Submit button
    updatedForm = wrapper.find('BulkVerifyForm')
    tacInput = updatedForm.find('input').at(2)
    //Simulate Input Value
    tacInput.simulate("change", {
      target: {
        value: 'abc',
        name: 'tac'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')

    //Test
    expect(wrapper.find('Formik').state().errors.tac).toEqual('The tac must be a number')

    //Find Form and Submit button
    updatedForm = wrapper.find('BulkVerifyForm')
    tacInput = updatedForm.find('input').at(2)
    //Simulate Input Value
    tacInput.simulate("change", {
      target: {
        value: '  ',
        name: 'tac'
      }
    })
    wrapper.update()
    wrapper.find('form').simulate('submit')

    //Test
    expect(wrapper.find('Formik').state().errors.tac).toEqual('Enter Valid Tac')
  })
  test("if TAC bulk upload successfully", () => {
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <BulkVerify kc={mockKcProps}  userDetails={userDetails}/>
        </I18nextProvider>
      </Router>
    )
    //Get instance of BulkVerify Component
    const instance = wrapper.find('BulkVerify').instance()
    //Added Spy function to tacPostData
    Sinon.spy(instance, 'tacPostData')
    const form = wrapper.find('BulkVerifyForm')
    //SetState to show Tac field
    form.setState({
      showTac: true,
      showFileInput: false
    })
    wrapper.update()
    //Find Form and Submit button
    const updatedForm1 = wrapper.find('BulkVerifyForm')
    const tacInput = updatedForm1.find('input').at(2)
    //Simulate Input Value
    tacInput.simulate("change", {
      target: {
        value: '12345678',
        name: 'tac'
      }
    })
    wrapper.update()
    const updatedForm2 = wrapper.find('BulkVerifyForm')
    const submit = updatedForm2.find('button').at(1)
    //Submit button disabled to be false with correct input value
    expect(submit.props().disabled).toBe(false)
    //Submit the form
    updatedForm2.find('form').simulate("submit")

    let responseObj = {
      data: {
        message: "You can track your request using this id",
        task_id: "43f2e547-605b-4e7c-a34e-381a08b45892"
      },
      status: 200
    }
    //Mocking Axios call with mock data
    mockAxios.mockResponse(responseObj)
    const state = wrapper.find('BulkVerify').state()
    //tacPostData should be called once
    expect(instance.tacPostData.callCount).toEqual(1)
    //Count be be reflect the mock value setted
 //   expect(localStorage.__STORE__.count).toEqual("2");

    //State update changes
    //Mock trackingId from
    expect(state.trackingId).toBe('43f2e547-605b-4e7c-a34e-381a08b45892')
    //Alert in state is updated
    /* expect(state.alert.enabled).toBe(true)
    expect(state.alert.message).toBe("You can track your request using this id") */

  });
  describe("Tab-delimited file", () => {
    beforeEach(() => {
      // values stored in tests will also be available in other tests unless you run
      mockAxios.reset()
      localStorage.clear();
      localStorage.count = 1;
      localStorage.tracking_ids = JSON.stringify(
        [
          {
            id: "84601c00-cbb1-4e58-9f70-d05e1264c4f9",
            created_at: "14/11/2018, 12:11:53",
            term: "TAC: 12312323"
          }
        ]
      )
    });
    test('Txt File submission',()=>{
      const mockFile = new File([''], 'test.txt', {type: 'text/plain'});
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <BulkVerify kc={mockKcProps} userDetails={userDetails}/>
          </I18nextProvider>
        </Router>
      )
      wrapper.find('input').find({name: 'fileInput'}).simulate('change', {
        target: {
          files: [
            {
              name: 'test.txt',
              file: mockFile,
              type: 'text/plain'
            }
          ]
        }
      })
      wrapper.find('button').find({disabled: false}).simulate('click')

      //Mock API call
      let mockTrackingId ="546964c0-42d1-47b6-9d09-ac41873accc5"
      let responseObj = {
        data: {
          "task_id": mockTrackingId,
          "message": "You can track your request using this id"
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      //Tests
       expect(wrapper.find('BulkVerify').state().alert.enabled).toEqual(true)
      expect(wrapper.find('BulkVerify').state().trackingId).toEqual(mockTrackingId)
      //After timeout will hide alert
      jest.runAllTimers()
       expect(wrapper.find('BulkVerify').state().alert.enabled).toEqual(false)
    })
    test('TSV File submission',()=>{
      const mockFile = new File([''], 'test.tsv', {type: 'tsv'});
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <BulkVerify kc={mockKcProps} userDetails={userDetails}/>
          </I18nextProvider>
        </Router>
      )
      wrapper.find('input').find({name: 'fileInput'}).simulate('change', {
        target: {
          files: [
            {
              name: 'test.tsv',
              file: mockFile,
              type: 'tsv'
            }
          ]
        }
      })
      wrapper.find('button').find({disabled: false}).simulate('click')

      //Mock API call
      let mockTrackingId ="546964c0-42d1-47b6-9d09-ac41873accc5"
      let responseObj = {
        data: {
          "task_id": mockTrackingId,
          "message": "You can track your request using this id"
        },
        status: 200
      }
      mockAxios.mockResponse(responseObj)

      //Tests
       expect(wrapper.find('BulkVerify').state().alert.enabled).toEqual(true)
      expect(wrapper.find('BulkVerify').state().trackingId).toEqual(mockTrackingId) 
      //After timeout will hide alert
      jest.runAllTimers()
       expect(wrapper.find('BulkVerify').state().alert.enabled).toEqual(false) 
    })
    test('Invalid File',()=>{
      const mockFile = new File([''], 'test.tsv', {type: 'tsv'});
      const wrapper = mount(
        <Router>
          <I18nextProvider i18n={i18n}>
            <BulkVerify kc={mockKcProps} userDetails={userDetails}/>
          </I18nextProvider>
        </Router>
      )
      wrapper.find('input').find({name: 'fileInput'}).simulate('change', {
        target: {
          files: [
            {
              name: 'test.png',
              file: mockFile,
              type: 'image/png'
            }
          ]
        }
      })

      //Tests
      expect(wrapper.find('BulkVerifyForm').state().inputError.enabled).toEqual(true)
      expect(wrapper.find('BulkVerifyForm').state().inputError.message).toEqual('Invalid Format')
    })

  })
})

describe("Bulk verify form component", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <MyEnhancedForm tac=""/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <MyEnhancedForm tac=""/>
      </I18nextProvider>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test("if form props renders correctly", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <MyEnhancedForm/>
      </I18nextProvider>
    )
    const form = wrapper.find('BulkVerifyForm')
    const buttons = form.find('button')
    expect(form.props().isSubmitting).toBe(false);
    expect(form.props().errors).toEqual({});
    expect(buttons.length).toEqual(2)
    expect(form.props().values.tac).toEqual('');
  })
  test("if form state renders correctly", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <MyEnhancedForm/>
      </I18nextProvider>
    )
    const form = wrapper.find('BulkVerifyForm')
    const state = form.state()
    expect(state.bulkFile.file).toBeNull()
    expect(state.bulkFile.name).toMatch('')
    expect(state.showFileInput).toBeTruthy()
    expect(state.showTac).toBeFalsy()

  })
  test("toggling between file input and Tac input", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <MyEnhancedForm/>
      </I18nextProvider>
    )
    const form = wrapper.find('BulkVerifyForm')
    const radioFileInput = form.find('#bulkTabDelimited')
    const radioTacInput = form.find('#bulkEnterTAC')

    radioTacInput.simulate("change", {
      target: {
        checked: true
      }
    })
    wrapper.update();
    expect(wrapper.find('BulkVerifyForm').state().showTac).toBe(true)

    radioFileInput.simulate("change", {
      target: {
        checked: true
      }
    })
    wrapper.update();
    expect(wrapper.find('BulkVerifyForm').state().showFileInput).toBe(true)
  })
  test("TAC input submit", () => {
    const spy = Sinon.spy()
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <MyEnhancedForm disableButton={true} callServer={spy}/>
      </I18nextProvider>
    )
    const form = wrapper.find('BulkVerifyForm')
    form.setState({
      showTac: true,
      showFileInput: false
    })
    wrapper.update()
    const updatedForm = wrapper.find('BulkVerifyForm')

    const tacInput = updatedForm.find('input').at(2)
    const submit = updatedForm.find('button').at(1)
    tacInput.simulate("change", {
      target: {
        value: '12345678',
        name: 'tac'
      }
    })
    expect(submit.props().disabled).toBe(false)
    updatedForm.find('form').simulate("submit")
    jest.runAllTimers();
    expect(spy.callCount).toEqual(1)
  })
})
