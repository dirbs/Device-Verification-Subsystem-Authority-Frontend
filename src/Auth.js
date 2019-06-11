import React, { Component } from "react";
import ReactDOM from "react-dom";

// Containers
//Import Helper functions
import { getUserGroups, isPage401 } from "./utilities/helpers";
import Base64 from "base-64";
import Keycloak from "keycloak-js";
import decode from "jwt-decode";
import Page401 from "./views/Errors/Page401";
import settings from "./settings.json";
import { KC_URL } from "./utilities/constants";
import { HashRouter, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Full from "./containers/Full";

const { clientId, realm } = settings.keycloak;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      readyToRedirect: false,
      redirectToFull: false,
      userDetails: null,
      tokenDetails: null
    };
  }

  componentDidMount() {
    const th = this;

    let kc = Keycloak({
      url: KC_URL,
      realm: realm,
      clientId: clientId
    });

    kc.init({ onLoad: "login-required" })
      .success(authenticated => {
        if (authenticated) {
          this.setState({ keycloak: kc, authenticated: authenticated });

          localStorage.setItem("token", kc.token);
          let tokenDetails = decode(kc.token);
          let groups = getUserGroups(tokenDetails);
          var pageStatus = isPage401(groups);
          if (pageStatus) {
            // is Page401 then show page401
            kc.loadUserInfo().success(function(userInfo) {
              th.setState(
                {
                  redirectTo404: true,
                  userDetails: userInfo,
                  keycloak: kc
                },
                () => {
                  th.setState({
                    readyToRedirect: true
                  });
                }
              );
            });
          } else {
            // User has permission and therefore, allowed to access it.
            kc.loadUserInfo().success(function(userInfo) {
              localStorage.setItem(
                "userInfo",
                Base64.encode(JSON.stringify(userInfo))
              );

              th.setState(
                {
                  redirectToFull: true,
                  userDetails: userInfo,
                  keycloak: kc,
                  tokenDetails: tokenDetails
                },
                () => {
                  th.setState({
                    readyToRedirect: true
                  });
                }
              );
            });
          }
        } else {
          kc.login();
        }
      })
      .error(function() {
        alert(
          "Keycloak configuration issue, please refer to Keycloak Documentation"
        );
      });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        if (this.state.redirectTo404 && this.state.readyToRedirect) {
            return (<HashRouter>
                <Switch>
                  <Route
                    path="/"
                    render={props => (
                      <Page401
                        kc={this.state.keycloak}
                        userDetails={this.state.userDetails}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </HashRouter>
            );
        }
         else if (this.state.redirectToFull && this.state.readyToRedirect) {
        return( <HashRouter>
            <Switch>
              <Route
                path="/"
                render={props => (
                  <Full
                    kc={this.state.keycloak}
                    userDetails={this.state.userDetails}
                    {...props}
                  />
                )}
              />
            </Switch>
          </HashRouter>
        );
      }
    }
    }

    return (
      <div className="page-loader">
        <div
          className="loading"
          data-app-name={i18n.t("deviceVerificationSystem")}
        >
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
export default Auth;
