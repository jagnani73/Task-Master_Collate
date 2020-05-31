import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { createBrowserHistory } from "history";
import SignInForm from "../../components/SignUpForm/SignUpForm";
import Jumbotron from "../../components/UI/Jumbotron/Jumbotron";

class SignUp extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <SignInForm
            onSubmitForm={(values) => this.props.onRegister(values)}
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
    onRegister: (data) => {
      dispatch(actions.register(data.name, data.email, data.password));
      history.push({
        pathname: "/",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
