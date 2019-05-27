import React, {Component} from 'react';
import {
  Nav,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import {I18n} from "react-i18next";

class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    return (
        <I18n ns="translations">
            {
                (t) => (
                    <header className="app-header navbar">
                        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                            <span className="navbar-toggler-icon">
                            </span>
                        </NavbarToggler>
                        <NavbarBrand href="#">
                            <h5 className="navbar-brand-minimized">DVS</h5>
                            <h5 className="navbar-brand-full">{t('deviceVerificationSystem')}</h5>
                        </NavbarBrand>
                        <NavbarToggler className="d-none mr-auto" onClick={this.sidebarToggle}>
                            <span className="navbar-toggler-icon"></span>
                        </NavbarToggler>
                        <Nav className="ml-auto" navbar>
                            <HeaderDropdown {...this.props} />
                        </Nav>
                    </header>
                )
            }
        </I18n>
                )

            };
}

export default Header;
