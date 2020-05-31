import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrowserHistory } from "history";

const LogInForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      progress: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("No Title provided."),
      content: Yup.string().required("No Content provided."),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <br />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        type="text"
        rows="7"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.content}
      />
      {formik.touched.content && formik.errors.content ? (
        <div>{formik.errors.content}</div>
      ) : null}

      <br />

      <label htmlFor="progress">Progress</label>
      <input
        id="progress"
        name="progress"
        type="range"
        min="1"
        max="100"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.progress}
      />
      <p>{formik.values.progress}%</p>

      <br />

      <button
        onClick={() => {
          let history = createBrowserHistory();
          history.goBack();
        }}
      >
        Cancel
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LogInForm;
