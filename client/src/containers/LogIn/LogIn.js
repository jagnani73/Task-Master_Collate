import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { createBrowserHistory } from "history";
import LogInForm from "../../components/LogInForm/LogInForm";
import Jumbotron from "../../components/UI/Jumbotron/Jumbotron";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <LogInForm
            onSubmitForm={(values) => this.props.onLogin(values)}
            errorMessage={
              this.props.showError ? <div>{this.props.showError}</div> : null
            }
          />
        </Jumbotron>
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
