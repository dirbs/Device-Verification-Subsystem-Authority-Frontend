import Footer from './Footer';
import {mount} from 'enzyme';

describe('Footer Component', ()=> {
  test('if Footer wrapper contains app-footer class', ()=>{
    const wrapper  = shallow(<Footer />)
    expect(wrapper.hasClass('.app-footer'));
  })

  test('contains two divs', ()=>{
    const wrapper  = shallow(<Footer />)
    expect(wrapper.find('div'));
  })
})