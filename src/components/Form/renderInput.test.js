/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import renderInput from './renderInput';
import {Field,Formik} from 'formik';

const groupClass = "test-class";
describe('renderInput', () => {
  /* Test if renders successfully */
  test('should render renderInput successfully', () => {
    const wrapper = shallow(<renderInput/>);
    expect(wrapper.exists()).toBe(true);
  });
  /* Test if props values defined by the user i.e. type, class and max-length */
  test('should render component with type, class and maxLength are defined', () => {
    const wrapper = shallow(<renderInput type="text"/>);
    const typeNumber = shallow(<renderInput type="number"/>);
    const gClass = shallow(<renderInput groupClass={groupClass}/>);
    const maxLength = shallow(<renderInput maxLength="16"/>);
    expect(wrapper.hostNodes().prop('type')).toBe('text');
    expect(typeNumber.hostNodes().prop('type')).toBe('number');
    expect(gClass.hostNodes().prop('groupClass')).toBe('test-class');
    expect(maxLength.hostNodes().prop('maxLength')).toBe('16');
  })
  /* Test - should render error if field is required */
  test('should render required icon i.e. *', () => {
    const wrapper = mount(<Formik onSubmit={()=>{}}>
      <Field class="col-md-9 col-sm-7" name="imei" maxLength="16" component={renderInput}
             label="test" type="text" placeholder="test"
             requiredStar/>
    </Formik>);
    expect(wrapper.contains(<span className="text-danger">*</span>)).toBe(true);
  })
  test('input values renders', () => {
    const wrapper = mount(<Formik onSubmit={()=>{}}>
      <Field class="col-md-9 col-sm-7" name="test" maxLength="16" component={renderInput}
             label="test" type="text" placeholder="test"
             requiredStar/>
    </Formik>);
    expect(wrapper.find('input').props().name).toBe('test')
    expect(wrapper.find('input').props().type).toBe('text')
    expect(wrapper.find('input').props().placeholder).toBe('test')
  })
  test('should render label', () => {
    const wrapper = mount(<Formik onSubmit={()=>{}}>
      <Field class="col-md-9 col-sm-7" name="test" maxLength="16" component={renderInput}
             label="test" type="text" placeholder="test"
             requiredStar/>
    </Formik>);
    expect(wrapper.find('label').length).toBe(1)
    expect(wrapper.find('label').text()).toBe('test * ')
  })
})