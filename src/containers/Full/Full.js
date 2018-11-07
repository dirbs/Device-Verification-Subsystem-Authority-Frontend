import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';
import { translate } from 'react-i18next';

import VerifyImei from '../../views/Verification/VerifyImei'
import BulkVerify from "../../views/BulkVerification/BulkVerify";
import Page401 from '../../views/Errors/Page401';
import CheckStatus from "../../views/Verification/CheckStatus";

class Full extends Component {
  
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lng) {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  }
  render() {
    return (
      <div className="app">
        <Header {...this.props} switchLanguage={this.changeLanguage} />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb {...this.props} />
            <Container fluid>
              <Switch>
                <Route path="/verifyImei" name="Verify IMEI" render={() => <VerifyImei {...this.props} /> } />
                <Route path="/bulk-verify" name="Bulk verify" render={() => <BulkVerify {...this.props} /> } />
                <Route path="/check-status" name="Check Status" render={() => <CheckStatus {...this.props} /> } />
                <Route path="/unauthorized-access" name="Page401"  component={Page401} />
                <Redirect from="/" to="/verifyImei"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default translate('translations')(Full);
