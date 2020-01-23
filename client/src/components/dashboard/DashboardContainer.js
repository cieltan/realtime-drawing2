import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class DashboardContainer extends Component {
  render() {
    return (
      <div>
        <h1>You are logged in.</h1>
        <Link to="/game">
          <Button variant="contained" color="primary">
            Join Game
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.logoutUser}
        >
          Logout
        </Button>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(DashboardContainer);
