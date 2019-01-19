import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskItem from "./ProjectTask/TaskItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllTasks, clearTask } from "../actions/taskActions";

class ProjectBoard extends Component {

  componentDidMount() {
    if (this.props.auth.authed) {
      this.props.getAllTasks();
    }
    this.props.clearTask();
  }

  render() {
    const { tasks } = this.props.tasks;
    let boardContent;
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    const BoardAlgorithm = tasks => {
      if (tasks.length < 1) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No tasks for this board.
          </div>
        );
      } else {
        const taskMap = tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ));

        for (let i = 0; i < taskMap.length; i++) {
          if (taskMap[i].props.task.status === "TO_DO") {
            todoItems.push(taskMap[i]);
          }

          if (taskMap[i].props.task.status === "IN_PROGRESS") {
            inProgressItems.push(taskMap[i]);
          }

          if (taskMap[i].props.task.status === "DONE") {
            doneItems.push(taskMap[i]);
          }
        }

        return (
          <React.Fragment>
          {console.log(this.props)}
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-secondary text-white">
                      <h3>TO DO</h3>
                    </div>
                  </div>

                  {todoItems}
                </div>
                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-primary text-white">
                      <h3>In Progress</h3>
                    </div>
                  </div>

                  {inProgressItems}
                </div>
                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-success text-white">
                      <h3>Done</h3>
                    </div>
                  </div>

                  {doneItems}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    };

    boardContent = BoardAlgorithm(tasks);

    return (
      <div className="container">
        <Link to="/addtask" className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  auth: state.auth
});

ProjectBoard.propTypes = {
  getAllTasks: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getAllTasks, clearTask }
)(ProjectBoard);
