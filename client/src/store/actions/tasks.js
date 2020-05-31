import * as actionTypes from "./actionTypes";
import axios from "axios";

import { createBrowserHistory } from "history";

export const fetchTasks = () => {
  return (dispatch) => {
    let token = localStorage.getItem("authToken");
    axios
      .get("/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(setTasks(res.data.data));
      })
      .catch((err) => {
        if (err) {
          let history = createBrowserHistory();
          history.go({
            pathname: "/error/500",
          });
        }
      });
  };
};

export const setTasks = (tasks) => {
  return {
    type: actionTypes.SET_TASKS,
    tasks: tasks,
  };
};

export const deleteTask = (id, index) => {
  let token = localStorage.getItem("authToken");
  return (dispatch) => {
    axios
      .post(
        "/api/tasks/delete",
        {
          id: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        dispatch(removeTask(id, index));
      })
      .catch((err) => console.log(err.response));
  };
};
export const removeTask = (id, index) => {
  return {
    type: actionTypes.REMOVE_TASK,
    id: id,
    index: index,
  };
};
