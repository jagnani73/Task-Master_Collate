import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { createBrowserHistory } from "history";

import classes from "./SingleTaskForm.module.css";

const LogInForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: props.initialTitle,
      content: props.initialContent,
      progress: props.initialProgress,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("No Title provided."),
      content: Yup.string().required("No Content provided."),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <React.Fragment>
      <h1 className="col-12 text-center"> Update your task </h1>
      <form onSubmit={formik.handleSubmit} className="mx-auto col-12 col-lg-8">
        <label htmlFor="title" className={classes.label_title}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={classes.title + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />

        {formik.touched.title && formik.errors.title ? (
          <div className={classes.error + " col-12"}>{formik.errors.title}</div>
        ) : null}

        <br />

        <label htmlFor="content" className={classes.label_content}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          type="text"
          rows="7"
          className={classes.content + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />

        {formik.touched.content && formik.errors.content ? (
          <div className={classes.error + " col-12"}>
            {formik.errors.content}
          </div>
        ) : null}

        <br />

        <label htmlFor="progress" className={classes.label_progress}>
          Progress
        </label>
        <div className="text-center">
          <input
            id="progress"
            name="progress"
            type="range"
            min="0"
            max="100"
            className={classes.progress + " col-11 mx-auto"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.progress}
          />
          <p className={classes.progressPercentage}>
            {formik.values.progress}%
          </p>
        </div>

        <br />

        <div className="col-12 text-center">
          <Button
            className={classes.btn + " col-6"}
            color="warning"
            onClick={() => {
              let history = createBrowserHistory();
              history.goBack();
            }}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            className={classes.btn + " col-6"}
            color="success"
          >
            UPDATE
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LogInForm;
