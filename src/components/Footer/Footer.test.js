import Footer from './Footer';
import {mount} from 'enzyme';

describe('Footer Component', ()=> {
  test('if Footer wrapper contains app-footer class', ()=>{
    const wrapper  = mount(<Footer />)
    expect(wrapper.find('footer').hasClass('app-footer')).toBe(true);
  })

  test('contains two divs', ()=>{
    const wrapper  = mount(<Footer />)
    expect(wrapper.find('div')).toHaveLength(2);
  })
})