import React from 'react';
import {shallow, mount} from 'enzyme';
import Header from "./Header";
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
    const wrapper = shallow(<Header/>);
    expect(wrapper.hasClass(".app-header"));
  })
  /**
   * Test if header consists of ul
   */
  test('If header has navbar-toggler-icon',()=>{
    const wrapper = shallow(<Header/>);
    expect(wrapper.hasClass('.navbar-toggler-icon'));
  })
  /**
   * Test if logout function works
   */
  /* test('If Logout button clicks',()=>{
    const mockLogout = jest.fn();
    const wrapper = mount(<Header kc={{logout: mockLogout}} userDetails={userDetails}/>);
    wrapper.find('.dropdown-menu button').simulate('click')
    expect(mockLogout.mock.calls.length).toEqual(1)
  }) */

  test('should toggle sidebar', () => {
    const wrapper = shallow(<Header kc={mockKcProps}/>);
    wrapper.hasClass('.d-lg-none')
  })

  test('should toggle mobile sidebar', () => {
    const wrapper = shallow(<Header  kc={mockKcProps}/>);
    wrapper.hasClass('.d-none mr-auto')
  })

})