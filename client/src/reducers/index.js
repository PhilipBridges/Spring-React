import {combineReducers} from 'redux';
import errorReducer from "./errorReducer";
import taskReducer from "./taskReducer";
import authReducer from "./authReducer";

export default combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
  auth: authReducer
});