import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TASKS,
  DELETE_TASK,
  GET_TASK
} from "./types";

export const addTask = (task, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/board", task);
    history.push("/");
    dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getAllTasks = () => async dispatch => {
  const auth = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") }
  };
  const res = await axios.get("http://localhost:8080/api/board/all");
  dispatch({
    type: GET_TASKS,
    payload: res.data
  });
};

export const deleteTask = taskId => async dispatch => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`http://localhost:8080/api/board/${taskId}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
  }
};

export const getTask = (taskId, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/board/${taskId}`);
    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch {
    history.push("/");
  }
};

export const clearTask = () => async dispatch => {
  dispatch({
    type: GET_TASK,
    payload: {}
  });
};

export const removeTasks = () => async dispatch => {
  dispatch({
    type: GET_TASKS,
    payload: {}
  });
};
