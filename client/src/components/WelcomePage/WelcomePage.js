import React from "react";
import { Link } from "react-router-dom";

import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <React.Fragment>
      <h1 className={classes.title}>Hey! 😉</h1>
      <h4 className="text-center mt-4 mb-4">Welcome to The TaskApp</h4>
      <div className="text-center">
        <Link className={classes.link} to="/sign-up">
          Sign Up
        </Link>
        <Link className={classes.link} to="/log-in">
          Log In
        </Link>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
