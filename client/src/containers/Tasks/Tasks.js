import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button } from "reactstrap";
import { createBrowserHistory } from "history";

import classes from "./Tasks.module.css";
import Task from "../../components/Task/Task";
import Spinner from "../../components/UI/Spinner/Spinner";

class Tasks extends Component {
  componentWillMount() {
    let expirationTime = localStorage.getItem("authTokenExpiration");
    let currentTime = new Date().getTime();
    let forcedLogout = expirationTime - currentTime;
    setTimeout(() => this.props.onLogout(), forcedLogout);
    this.props.onFetchTasks();
  }

  onTaskOpened = (id) => {
    this.props.history.push({
      pathname: this.props.location.pathname + "/task/" + id,
    });
  };

  render() {
    let tasksLoader = <Spinner />;

    if (!this.props.loading) {
      tasksLoader = this.props.tasksArray.map((task, index) => (
        <Task
          key={task._id}
          title={task.title}
          content={task.content}
          progress={task.progress}
          deadline={task.deadline}
          createdAt={task.createdAt}
          removeClicked={() => this.props.onDeleteTask(task._id, index)}
          editClicked={() => this.onTaskOpened(task._id)}
        />
      ));
    }

    let noTasks;

    if (this.props.loading === false && this.props.tasksArray.length === 0) {
      noTasks = (
        <h1 className="col-12 text-center">Please add some new tasks!</h1>
      );
    }

    return (
      <div className={classes.Tasks}>
        {this.props.tasksArray.length === 0 ? null : (
          <h1 className="col-12 text-center">
            All your tasks{" "}
            <span role="img" aria-label="hourglass">
              ⌛
            </span>
          </h1>
        )}
        {tasksLoader}
        {noTasks}
        <div className="col-12 mx-auto text-center">
          <Button
            outline
            color="danger"
            size="lg"
            className={classes.btn}
            onClick={() => {
              this.props.onLogout();
            }}
          >
            LOGOUT
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasksArray: state.tasks.tasks,
    loading: state.tasks.loading,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    onFetchTasks: () => dispath(actions.fetchTasks()),
    onDeleteTask: (id, index) => dispath(actions.deleteTask(id, index)),
    onLogout: () => {
      dispath(actions.logout());
      let history = createBrowserHistory();
      history.go({ pathname: "/" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
