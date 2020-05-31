import * as actionType from "../actions/actionTypes";

const initialState = {
  tasks: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_TASKS:
      return {
        ...state,
        tasks: action.tasks.reverse(),
        loading: false,
      };

    case actionType.REMOVE_TASK:
      let newTasks = [...state.tasks];
      newTasks.splice(action.index, 1);
      return {
        ...state,
        tasks: newTasks,
      };

    default:
      return state;
  }
};

export default reducer;
