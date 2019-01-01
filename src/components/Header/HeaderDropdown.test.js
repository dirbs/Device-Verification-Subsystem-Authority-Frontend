import HeaderDropdown from "./HeaderDropdown";

const userDetails = {
  preferred_username: "User"
}

describe('HeaderDropdown Component', () => {
  test('renders HeaderDropdown', () => {
    const mockLogout = Sinon.spy();
    const wrapper = shallow(<HeaderDropdown userDetails={userDetails} kc={{logout: mockLogout}}/>);
    expect(wrapper.exists()).toBe(true);
  })

  test('should toggle the state.dropdownOpen property when clicking on username dropdown button', () => {
    const mockLogout = Sinon.spy();
    const wrapper = mount(<HeaderDropdown userDetails={userDetails} kc={{logout: mockLogout}}/>);

    // find button and simulate click
    wrapper.find('button').simulate('click')
    expect(wrapper.state().dropdownOpen).toBe(true);

    // find button and simulate click
    wrapper.find('button').simulate('click')
    expect(wrapper.state().dropdownOpen).toBe(false);
  })

  test('if logout button works', ()=>{
    const mockLogout = Sinon.spy();
    const wrapper = mount(<HeaderDropdown userDetails={userDetails} kc={{logout: mockLogout}} />);
    wrapper.find('button').simulate('click');
    expect(mockLogout.callCount).toBe(1);
  })

  test('logout button text is Logout', ()=>{
    const mockLogout = Sinon.spy();
    const wrapper = mount(<HeaderDropdown userDetails={userDetails} kc={{logout: mockLogout}} />);
    expect(wrapper.find('button').text().trim()).toBe('Logout');
  })
});