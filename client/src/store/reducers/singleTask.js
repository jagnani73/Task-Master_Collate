import * as actionType from "../actions/actionTypes";

const initialState = {
  title: null,
  content: null,
  author: null,
  updatedAt: null,
  createdAt: null,
  progress: null,
  deadline: null,
  loading: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_TASK:
      return {
        ...state,
        title: action.data.title,
        content: action.data.content,
        author: action.data.author.name,
        progress: action.data.progress,
        deadline: action.data.deadline,
        updatedAt: action.data.updatedAt,
        createdAt: action.data.createdAt,
        loading: false,
      };
    case actionType.HIDE_TASK:
      return {
        ...state,
        title: null,
        content: null,
        author: null,
        updatedAt: null,
        createdAt: null,
        loading: true,
      };
    case actionType.EDIT_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case actionType.EDIT_CONTENT:
      return {
        ...state,
        content: action.content,
      };

    default:
      return state;
  }
};

export default reducer;
