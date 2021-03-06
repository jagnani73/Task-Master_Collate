import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { plusSquare } from "react-icons-kit/fa/plusSquare";
import {
  Button,
  Jumbotron,
  Collapse,
  CardBody,
  Card,
  Progress,
} from "reactstrap";

import classes from "./Task.module.css";

const Task = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let progressColor = null;
  if (props.progress >= 0 && props.progress < 20) {
    progressColor = "danger";
  } else if (props.progress >= 20 && props.progress < 40) {
    progressColor = "warning";
  } else if (props.progress >= 40 && props.progress < 60) {
    progressColor = "info";
  } else if (props.progress >= 60 && props.progress < 80) {
    progressColor = null;
  } else if (props.progress >= 80 && props.progress < 100) {
    progressColor = "success";
  }

  return (
    <React.Fragment>
      <Jumbotron className={classes.Task}>
        <div className="row col-12">
          <div className="text-center text-lg-left col-lg-6 col-12">
            <h5 className={classes.TaskTitle}>{props.title}</h5>
          </div>
          <div className="text-center text-lg-right col-lg-6 col-12 my-3">
            <Button color="primary" outline onClick={toggle}>
              <Icon icon={plusSquare} size={28} />
            </Button>
          </div>
        </div>
        <Collapse isOpen={isOpen}>
          <Card>
            <h5 className="mt-4">Description</h5>
            <hr className="col-6 mx-auto" />
            <CardBody className={classes.TaskContent + " col-12 text-center"}>
              {props.content}
            </CardBody>
            <div className="text-center">
              <div>
                {props.progress === 100 ? (
                  <p className={classes.completed}>COMPLETED</p>
                ) : (
                  <React.Fragment>
                    <Progress
                      value={props.progress}
                      className={"mx-3"}
                      color={progressColor}
                    />
                    <p>{props.progress} %</p>
                    <p>{props.createdAt}</p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Card>
        </Collapse>
        <div className={classes.deadline}>Due: {props.deadline}</div>
        <div className="row">
          <div className="col-lg-3"></div>
          <Button
            onClick={props.removeClicked}
            className="col-lg-2 mt-3"
            color="danger"
          >
            REMOVE
          </Button>
          <div className="col-lg-2"></div>
          <Button
            onClick={props.editClicked}
            className="col-lg-2 mt-3"
            color="info"
          >
            EDIT
          </Button>
          <div className="col-lg-3"></div>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Task;
