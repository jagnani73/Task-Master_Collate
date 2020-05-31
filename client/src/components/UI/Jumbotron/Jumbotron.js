import React from "react";

import classes from "./Jumbotron.module.css";

const Jumbotron = (props) => {
  return (
    <React.Fragment>
      <div className={classes.jumbotronMain + " col-11 col-lg-9"}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Jumbotron;
