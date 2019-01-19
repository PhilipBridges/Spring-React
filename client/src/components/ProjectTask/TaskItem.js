import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/taskActions";

class TaskItem extends Component {
  onDelete(taskId) {
    this.props.deleteTask(taskId);
  }
  render() {
    const { task } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">ID: {task.id}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.summary}</h5>
          <p className="card-text text-truncate ">{task.criteria}</p>
          <Link to={`updateTask/${task.id}`} className="btn btn-primary">
            View / Update
          </Link>

          <button
            onClick={() => this.onDelete(task.id)}
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  deleteTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTask }
)(TaskItem);
