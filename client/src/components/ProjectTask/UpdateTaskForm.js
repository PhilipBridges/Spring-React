import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTask, addTask } from "../../actions/taskActions";
import classnames from "classnames";

class UpdateTaskForm extends Component {
  state = {
    id: "",
    summary: "",
    criteria: "",
    status: "",
    errors: {},
    loading: false
  };

  componentDidUpdate(props, state) {
    if (
      (props.task && this.props.task.id !== props.task.id) ||
      state.id === ""
    ) {
      this.setState(this.props.task);
    }
  }

  static getDerivedStateFromProps(props) {
    if (Object.getOwnPropertyNames(props.errors).length) {
      return { errors: { ...props.errors } };
    }
    return null;
  }

  componentDidMount() {
    const { taskId } = this.props.match.params;
    this.props.getTask(taskId);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const updatedTask = {
      ...this.state
    };
    this.props.addTask(updatedTask, this.props.history);
  };

  render() {
    if (this.state.loading) {
      return <p>Loading</p>;
    }
    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                Back to Board
              </Link>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.summary
                    })}
                    name="summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  <p>{this.state.errors.summary}</p>
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.criteria
                    })}
                    name="criteria"
                    value={this.state.criteria}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.status
                    })}
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateTaskForm.propTypes = {
  getTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  task: state.tasks.task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTask, addTask }
)(UpdateTaskForm);
