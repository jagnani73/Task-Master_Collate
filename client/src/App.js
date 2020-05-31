import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import LogIn from "./containers/LogIn/LogIn";
import SignUp from "./containers/SignUp/SignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import NotFoundPage from "./components/404/404";
import NavigationItems from "./components/NavigationItems/NavigationItems";

class App extends Component {
  componentWillMount() {
    this.props.onCheckLogin();
  }

  render() {
    let routes = (
      <React.Fragment>
        {this.props.isAuth ? <NavigationItems /> : null}
        <Switch>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/log-in" exact component={LogIn} />
          <Route path="/" exact component={WelcomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </React.Fragment>
    );

    return <React.Fragment>{routes}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckLogin: () => dispatch(actions.checkLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
