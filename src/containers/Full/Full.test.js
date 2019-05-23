/*Copyright (c) 2018 Qualcomm Technologies, Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import React from 'react'
import i18n from "./../../i18nTest"
import { I18nextProvider } from "react-i18next";
import Full from './Full'
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router';


describe("Full component", () => {
  test("if renders correctly", () => {
    const wrapper = shallow(
      <Full/>);
    expect(wrapper).toMatchSnapshot()
  })
  test("if renders correctly again", () => {
    const wrapper = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={{preferred_username: 'test'}} kc={mockKcProps}/>
        </I18nextProvider>
      </Router>
    )
    expect(wrapper).toMatchSnapshot()
  });
  test('if render header',()=>{
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={{preferred_username: 'test'}}  kc={mockKcProps}/>
        </I18nextProvider>
      </Router>
    )
    let component = wrapper.find('Full')
    expect(component.find('Header').length).toEqual(1)
  })
  test('if has class main',()=>{
    const wrapper = mount(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={{preferred_username: 'test'}} kc={mockKcProps}/>
        </I18nextProvider>
      </Router>
    )
    let component = wrapper.find('Full')
    expect(component.find('main').hasClass('main')).toBe(true)
  })
  test('if redirects to Bulk verify correctly',()=>{
    const wrapper = mount(
      <MemoryRouter initialEntries={['/bulk-verify']}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={{preferred_username: 'test'}} kc={mockKcProps}/>
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(wrapper.find('BulkVerify').length).toEqual(1)
  })
  test('if redirects to CheckStatus correctly',()=>{
    const wrapper = mount(
      <MemoryRouter initialEntries={['/check-status']}>
        <I18nextProvider i18n={i18n}>
          <Full userDetails={{preferred_username: 'test'}} kc={mockKcProps}/>
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(wrapper.find('CheckStatus').length).toEqual(1)
  })
})