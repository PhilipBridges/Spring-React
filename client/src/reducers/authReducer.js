import { SET_CURRENT_USER } from "../actions/types";
import { isEmpty } from "../utils";

const initialState = {
  authed: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        authed: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
