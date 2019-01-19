import { GET_TASKS, DELETE_TASK, GET_TASK } from "../actions/types";

const initialState = {
  tasks: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload
      };

    case GET_TASK:
      return {
        ...state,
        task: payload
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== payload)
      };

    default:
      return state;
  }
};
