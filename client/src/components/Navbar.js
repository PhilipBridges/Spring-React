import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logout();
    window.location.reload();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Project Task Tool
          </Link>
          {!this.props.auth.authed && (
            <React.Fragment>
              <Link
                className="nav-link"
                to="/register"
                style={{ color: "white" }}
              >
                Register
              </Link>
              <Link className="nav-link" to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </React.Fragment>
          )}
          {this.props.auth.authed && (
            <React.Fragment>
              <a
                onClick={this.onLogoutClick}
                className="nav-item nav-link"
                href="#"
                style={{ color: "white" }}
              >
                ({this.props.auth.user.sub}) Logout
              </a>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
