import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./SingleTask.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import SingleTaskForm from "../../components/SingleTaskForm/SingleTaskForm";

class SingleTask extends Component {
  componentWillMount() {
    console.log(
      "[SingleTask.js]ComponentWillMount",
      this.props.match.params.id
    );
    this.props.onFetchTask(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onRemoveTask();
  }

  render() {
    console.log(this.props.match.params.id, "SingleTask.js");

    let taskLoader = <Spinner />;
    if (!this.props.loading) {
      taskLoader = (
        <React.Fragment>
          <SingleTaskForm
            initialTitle={this.props.task.title}
            initialContent={this.props.task.content}
            initialProgress={this.props.task.progress}
            onSubmitForm={(values) =>
              this.props.onSaveChanges(this.props.match.params.id, values)
            }
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className={classes.SingleTask}>{taskLoader}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: {
      title: state.singleTask.title,
      content: state.singleTask.content,
      progress: state.singleTask.progress,
      author: state.singleTask.author,
      updatedAt: state.singleTask.updatedAt,
      createdAt: state.singleTask.createdAt,
    },
    loading: state.singleTask.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTask: (id) => dispatch(actions.fetchTask(id)),
    onRemoveTask: () => dispatch(actions.removeTask()),
    onSaveChanges: (id, data) =>
      dispatch(actions.saveTask(id, data.title, data.content, data.progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
