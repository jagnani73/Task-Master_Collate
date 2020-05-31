import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { createBrowserHistory } from "history";

import classes from "./LogInForm.module.css";

const LogInForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is Required."),
      password: Yup.string().required("No password provided."),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <React.Fragment>
      <h1 className="col-12 text-center"> Log In! </h1>
      <form onSubmit={formik.handleSubmit} className="mx-auto col-12 col-lg-8">
        <label htmlFor="email" className={classes.label_email}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={classes.email + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className={classes.error + " col-12"}>{formik.errors.email}</div>
        ) : null}

        <br />

        <label htmlFor="password" className={classes.label_password}>
          Password
        </label>
        <input
          id="password"
          name="password"
          className={classes.password + " col-11"}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={classes.error + " col-12"}>
            {formik.errors.password}
          </div>
        ) : null}

        <div className={classes.error + " col-12"}>{props.errorMessage}</div>
        <div className="col-12 text-center">
          <Button
            className={classes.btn + " col-6"}
            color="warning"
            onClick={() => {
              let history = createBrowserHistory();
              history.goBack();
            }}
          >
            Go Back
          </Button>
          <Button
            type="submit"
            className={classes.btn + " col-6"}
            color="success"
          >
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LogInForm;
