import React, {Component} from 'react';
import {I18n} from "react-i18next";

class Footer extends Component {
  render() {
    return (
        <I18n ns="translations">
            {
                (t) => (
        <footer className="app-footer">
            <div>&copy; {t('copyright')} 2018 <span>DIRBS</span>. {t('allRightsReserved')}.</div>
            <div><b>{t('Version')}: </b>1.0.0</div>
        </footer>
                )
            }
        </I18n>
    )
  }
}
export default Footer;
