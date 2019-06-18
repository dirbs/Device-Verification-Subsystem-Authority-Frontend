import React from 'react';
import {shallow, mount} from 'enzyme';
import Header from "./Header";
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'
const userDetails = {
  preferred_username: "User"
}
describe('Header component',()=>{
  /**
   * Test if header renders successfully
   */
  test('If header renders',()=>{
    const wrapper = shallow(<Header/>);
    expect(wrapper.exists()).toBe(true);
  })
  /**
   * Test if header consists of class
   */
  test('If header has class',()=>{
    const mockLogout = jest.fn();
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
      <Header  kc={{logout: mockLogout}} userDetails={userDetails}/>
      </I18nextProvider>);
    const headerClass =  wrapper.find('.app-header');
    expect(headerClass.length).toEqual(1);
  })
  /**
   * Test if header consists of ul
   */
  test('If header has navbar-toggler-icon',()=>{
    const mockLogout = jest.fn();
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
      <Header  kc={{logout: mockLogout}} userDetails={userDetails}/>
      </I18nextProvider>);
    expect(wrapper.contains(<span className="navbar-toggler-icon"></span>)).toBe(true);
  })
  /**
   * Test if logout function works
   */
   test('If Logout button clicks',()=>{
    const mockLogout = jest.fn();
    
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
      <Header  kc={{logout: mockLogout}} userDetails={userDetails}/>
      </I18nextProvider>);
    wrapper.find('.dropdown-menu button').simulate('click')
    expect(mockLogout.mock.calls.length).toEqual(1)
  }) 

  test('should toggle sidebar', () => {
    const mockLogout = jest.fn();
    
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
      <Header  kc={{logout: mockLogout}} userDetails={userDetails}/>
      </I18nextProvider>);
    wrapper.find('NavbarToggler').at(1).simulate('click', {
      preventDefault: () => {
      }
    })
    console.log(document.body.classList.contains('sidebar-hidden'))
    expect(document.body.classList.contains('sidebar-hidden'))
  })

  test('should toggle mobile sidebar', () => {
    const mockLogout = jest.fn();
    
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
      <Header  kc={{logout: mockLogout}} userDetails={userDetails}/>
      </I18nextProvider>);
    wrapper.find('NavbarToggler').at(0).simulate('click', {
      preventDefault: () => {
      }
    })
    expect(document.body.classList.contains('sidebar-mobile-show'))
  })

})