import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProjectBoard from "./components/ProjectBoard";
import AddTaskForm from "./components/ProjectTask/AddTaskForm";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import UpdateTaskForm from "./components/ProjectTask/UpdateTaskForm";
import { setAuthToken } from "./utils";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logout } from "./actions/authActions";

if (localStorage.token) {
  setAuthToken(localStorage.token);

  const jwt = jwt_decode(localStorage.token);

  store.dispatch(setCurrentUser(jwt));

  const currentTime = Date.now() / 1000;

  if (jwt.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ProjectBoard} />
            <Route exact path="/addTask" component={AddTaskForm} />
            <Route
              exact
              path="/updateTask/:taskId"
              component={UpdateTaskForm}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
