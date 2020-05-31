import * as actionType from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  showError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AFTER_LOGIN:
      return {
        ...state,
        isAuth: true,
      };

    case actionType.CHECK_LOGIN:
      return {
        ...state,
        isAuth: true,
      };

    case actionType.LOGOUT:
      localStorage.removeItem("authToken");
      alert("You are about to be logged out");
      return {
        ...state,
        isAuth: false,
      };

    case actionType.SHOW_ERROR:
      console.log(action.error);
      return {
        ...state,
        showError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
