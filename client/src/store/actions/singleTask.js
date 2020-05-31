import axios from "axios";
import * as actionTypes from "./actionTypes";

import { createBrowserHistory } from "history";

export const fetchTask = (id) => {
  return (dispatch) => {
    let token = localStorage.getItem("authToken");
    axios
      .get(`/api/tasks/get?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setTask(res.data.data));
      })
      .catch((err) => {
        if (err) {
          alert("404: Task not found");
          let history = createBrowserHistory();
          history.goBack();
        }
      });
  };
};

export const setTask = (data) => {
  console.log(data);
  return {
    type: actionTypes.SET_TASK,
    data,
  };
};

export const removeTask = () => {
  return {
    type: actionTypes.HIDE_TASK,
  };
};

export const editTitle = (title) => {
  return {
    type: actionTypes.EDIT_TITLE,
    title: title,
  };
};

export const editContent = (content) => {
  return {
    type: actionTypes.EDIT_CONTENT,
    content: content,
  };
};

export const saveTask = (id, title, content, progress) => {
  console.log(id, title, content, progress);
  let token = localStorage.getItem("authToken");
  return () => {
    axios
      .post(
        "/api/tasks/edit",
        {
          id: id,
          title: title,
          content: content,
          progress: progress,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        let history = createBrowserHistory();
        history.push("/tasks");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
};
