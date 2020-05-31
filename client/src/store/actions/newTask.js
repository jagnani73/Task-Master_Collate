import axios from "axios";

import { createBrowserHistory } from "history";

export const newTask = (title, content, progress) => {
  let token = localStorage.getItem("authToken");
  return () => {
    axios
      .post(
        "/api/tasks/add",
        {
          title,
          content,
          progress,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        let history = createBrowserHistory();
        history.push("/tasks");
        window.location.reload(false);
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
