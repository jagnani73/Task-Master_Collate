import React, { useState } from "react";
import {
  Button,
  Jumbotron,
  Collapse,
  CardTitle,
  CardBody,
  Card,
  Progress,
} from "reactstrap";

import classes from "./Task.module.css";

const Task = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Jumbotron className={classes.Task}>
        <div className="row col-12">
          <div className="text-left col-6">
            <h5 className={classes.TaskTitle}>{props.title}</h5>
          </div>
          <div className="text-right col-6">
            <Button color="primary" onClick={toggle}>
              Toggle
            </Button>
          </div>
        </div>
        <Collapse isOpen={isOpen}>
          <Card>
            <CardTitle className="mt-4">Description</CardTitle>
            <hr className="col-6 mx-auto" />
            <CardBody className={classes.TaskContent + " col-12 text-center"}>
              {props.content}
            </CardBody>
            <div className="text-center">
              <div>
                {props.progress === 100 ? (
                  <p>COMPLETED</p>
                ) : (
                  <React.Fragment>
                    <Progress value={props.progress} className={"mx-3"} />
                    <p>{props.progress} %</p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Card>
        </Collapse>
        <div className="row">
          <div className="col-3"></div>
          <Button
            onClick={props.removeClicked}
            className="col-2 mt-3"
            color="danger"
          >
            REMOVE
          </Button>
          <div className="col-2"></div>
          <Button
            onClick={props.editClicked}
            className="col-2 mt-3"
            color="info"
          >
            EDIT
          </Button>
          <div className="col-3"></div>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Task;
