import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Tasks from "./containers/Tasks/Tasks";
import NewTask from "./containers/NewTask/NewTask";
import SingleTask from "./containers/SingleTask/SingleTask";
import NavigationItems from "./components/NavigationItems/NavigationItems";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import NotFoundPage from "./components/404/404";
import Unauthorised from "./components/403/403";
import LogIn from "./containers/LogIn/LogIn";
import SignUp from "./containers/SignUp/SignUp";

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem("authToken")) {
      this.props.onCheckLogin();
    }
  }
  render() {
    let routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/log-in" exact component={LogIn} />
          <Route exact path="/tasks/task/:id" component={Unauthorised} />
          <Route exact path="/tasks/new-task" component={Unauthorised} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Route exact path="/tasks">
          <Redirect to="/" />
        </Route>
      </React.Fragment>
    );

    if (this.props.isAuth) {
      routes = (
        <React.Fragment>
          <NavigationItems />

          <Switch>
            <Route path="/tasks/task/:id" component={SingleTask} />
            <Route path="/tasks/new-task">
              <NewTask />
              <Tasks />
            </Route>
            <Route path="/tasks" exact component={Tasks} />
            <Route path="*" component={NotFoundPage} />
          </Switch>

          <Route exact path="/">
            <Redirect to="/tasks" />
          </Route>
        </React.Fragment>
      );
    }

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
