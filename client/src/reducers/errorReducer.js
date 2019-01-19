import { GET_ERRORS } from "../actions/types";
import { CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return { ...state, ...payload };

    case CLEAR_ERRORS:
      return payload;

    default:
      return state;
  }
};  
