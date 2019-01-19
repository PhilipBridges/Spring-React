import axios from "axios";
import {
  REGISTER_USER,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./types";
import { setAuthToken } from "../utils";
import jwt_decode from "jwt-decode";
import { removeTasks } from "./taskActions";

export const registerUser = (registerData, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/auth/signup", registerData);
    history.push("/");
    dispatch({
      type: REGISTER_USER,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = (loginData, history) => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/signin",
      loginData
    );
    const token = res.data.accessToken;
    localStorage.setItem("token", token);

    setAuthToken(token);

    const jwt = jwt_decode(token);

    dispatch(setCurrentUser(jwt));

    history.push("/");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(removeTasks());
};

export const setCurrentUser = jwt => {
  return {
    type: SET_CURRENT_USER,
    payload: jwt
  };
};
