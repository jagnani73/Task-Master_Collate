import React from "react";
import { Button, Jumbotron } from "reactstrap";

import classes from "./Task.module.css";

const Task = (props) => {
  return (
    <Jumbotron className={classes.Task}>
      <div className="text-center">
        <h1 className={classes.TaskTitle}>{props.title}</h1>
        <hr className="col-6" />
        <p className={classes.TaskContent + " col-12 text-center"}>
          {props.content}
        </p>
        <div>{props.progress}</div>
      </div>
      <p className="row">
        <div className="col-3"></div>
        <Button
          onClick={props.removeClicked}
          className="col-2 mt-3"
          variant="danger"
        >
          REMOVE
        </Button>
        <div className="col-2"></div>
        <Button
          onClick={props.editClicked}
          className="col-2 mt-3"
          variant="info"
        >
          EDIT
        </Button>
        <div className="col-3"></div>
      </p>
    </Jumbotron>
  );
};

export default Task;
