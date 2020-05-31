import axios from "axios";
import * as actionTypes from "./actionTypes";

export const register = (name, email, password) => {
  return (dispatch) => {
    axios
      .post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "OK") {
          alert("User Registered. Please login once!");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        if (err.response.data.error === "User is already registered!") {
          let errMessage =
            "User has already registered with the email. Try with other email.";
          dispatch(showError(errMessage));
        } else {
          alert("Server Error. Please try again.");
          let errMessage = "Server Error. Please try again.";
          dispatch(showError(errMessage));
        }
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === "OK") {
          localStorage.setItem("authToken", res.data.authToken);
          window.location.reload(false);
          dispatch(afterlogin());
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Username or Password Wrong!") {
          let errMessage = "Invalid Credentials. Please try again.";
          dispatch(showError(errMessage));
        } else {
          let errMessage = "Server Error. Please try again.";
          dispatch(showError(errMessage));
        }
      });
  };
};

export const afterlogin = () => {
  return {
    type: actionTypes.AFTER_LOGIN,
  };
};

export const checkLogin = () => {
  return {
    type: actionTypes.CHECK_LOGIN,
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const showError = (error) => {
  return {
    type: actionTypes.SHOW_ERROR,
    error: error,
  };
};
