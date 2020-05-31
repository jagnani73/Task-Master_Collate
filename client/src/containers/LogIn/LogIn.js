import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { createBrowserHistory } from "history";
import LogInForm from "../../components/LogInForm/LogInForm";

import classes from "./LogIn.module.css";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className={classes.title + " col-6"}> Sign Up! </h1>
        {this.props.showError ? <div>{this.props.showError}</div> : null}
        <LogInForm onSubmitForm={(values) => this.props.onLogin(values)} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showError: state.auth.showError,
  };
};

const mapDispatchToProps = (dispatch) => {
  let history = createBrowserHistory();
  return {
    onLogin: (data) => {
      dispatch(actions.login(data.email, data.password));
      history.push({ pathname: "/tasks" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
