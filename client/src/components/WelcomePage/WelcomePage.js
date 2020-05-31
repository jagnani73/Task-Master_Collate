import React from "react";
import { Link } from "react-router-dom";

import classes from "./WelcomePage.module.css";
import Jumbotron from "../UI/Jumbotron/Jumbotron";

const WelcomePage = () => {
  return (
    <React.Fragment>
      <Jumbotron className={"col-10"}>
        <h1 className={classes.title}>Hey! 😉</h1>
        <h4 className="text-center mt-4 mb-4">Welcome to The TaskMaster</h4>
        <div className={classes.Links + " text-center"}>
          <Link className={classes.link} to="/sign-up">
            Sign Up
          </Link>
          <Link className={classes.link} to="/log-in">
            Log In
          </Link>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
};

export default WelcomePage;
