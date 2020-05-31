import React from "react";
import { useFormik } from "formik";
import { Button } from "reactstrap";
import * as Yup from "yup";
import { createBrowserHistory } from "history";

import classes from "./SignUpForm.module.css";

const SignupForm = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be atleast 2 characters")
        .required("What will we call you"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Our postal service is down"),
      password: Yup.string()
        .required("No password provided")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
          /[a-z]/ && /[A-Z]/ && /[0-9]/ && /[!@#$%^*]/,
          "Make it stronger"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <React.Fragment>
      <h1 className="col-12 text-center"> Sign Up! </h1>
      <form onSubmit={formik.handleSubmit} className="mx-auto col-12 col-lg-8">
        <label htmlFor="name" className={classes.label_name}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={classes.name + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={classes.error + " col-12"}>{formik.errors.name}</div>
        ) : null}

        <br />

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
          type="password"
          className={classes.password + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        <div className="col-11 mx-auto">
          <p className={classes.fileSpecs + " text-left text-muted"}>
            Minimum <strong>8 characters</strong>.
            <br />
            Should have atleast one
            <strong> Uppercase | Lowercase | Numerical | Symbol </strong>
          </p>
        </div>

        {formik.touched.password && formik.errors.password ? (
          <div className={classes.error + " col-12"}>
            {formik.errors.password}
          </div>
        ) : null}

        <br />

        <label htmlFor="confirmPassword" className={classes.label_password}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={classes.password + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        <br />

        {formik.touched.password && !formik.errors.password ? (
          formik.touched.confirmPassword &&
          formik.values.password !== formik.values.confirmPassword ? (
            <div className={classes.error + " col-12"}>
              {formik.errors.confirmPassword}
            </div>
          ) : null
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
          <Button type="submit" className={classes.btn + " col-6"} color="info">
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignupForm;
