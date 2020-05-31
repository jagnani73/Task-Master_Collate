import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { createBrowserHistory } from "history";
import SignInForm from "../../components/SignUpForm/SignUpForm";

import classes from "./SignUp.module.css";

class SignUp extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className={classes.title + " col-6"}> Sign Up! </h1>
        {this.props.showError ? <div>{this.props.showError}</div> : null}
        <SignInForm onSubmitForm={(values) => this.props.onRegister(values)} />
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
    onRegister: (data) => {
      dispatch(actions.register(data.name, data.email, data.password));
      history.push({
        pathname: "/",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
