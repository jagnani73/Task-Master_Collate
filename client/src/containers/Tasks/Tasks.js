import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { createBrowserHistory } from "history";

import classes from "./Tasks.module.css";
import Task from "../../components/Task/Task";
import Spinner from "../../components/UI/Spinner/Spinner";

class Tasks extends Component {
  componentWillMount() {
    this.props.onFetchTasks();
  }

  onTaskOpened = (id) => {
    console.log(id, this.props);
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
          progress={
            task.progress === 0
              ? "Yet To Begin"
              : task.progress === 100
              ? "Completed"
              : task.progress + " %"
          }
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
          <h1 className="col-12 text-center">All your tasks (-:</h1>
        )}
        {tasksLoader}
        {noTasks}
        <button
          onClick={() => {
            this.props.onLogout();
          }}
        >
          Logout
        </button>
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
