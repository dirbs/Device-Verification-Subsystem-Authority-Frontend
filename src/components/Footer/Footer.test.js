import Footer from './Footer';
import {mount} from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'

describe('Footer Component', ()=> {
  test('if Footer wrapper contains app-footer class', ()=>{
    
    const wrapper  = mount(
      <I18nextProvider i18n={i18n}>
      <Footer/>
      </I18nextProvider>);
      expect(wrapper.find('footer').hasClass('app-footer')).toBe(true);
  })

  test('contains two divs', ()=>{
    const wrapper  = mount(
      <I18nextProvider i18n={i18n}>
      <Footer/>
      </I18nextProvider>);
    expect(wrapper.find('div')).toHaveLength(2);
  })
})