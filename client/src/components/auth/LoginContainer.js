import React, { Component } from 'react'
import {loginUser} from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class LoginContainer extends Component {

    constructor(props) {

        super(props);

        this.state ={
            username: "",
            password: "",
        }
    }

    componentDidMount() {
        let {auth, history} = this.props
        if(auth.isAuthenticated) { history.push("/dashboard") }
    }

    componentDidUpdate(prevProps, prevState) {
        const {auth, history} = this.props

        if(auth.isAuthenticated) {
            history.push("/dashboard")
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state);
    }

    render() {

        return (
            <div>
                <h1>Login</h1>
                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input placeholder="Username"  id="username" onChange={this.handleChange} value={this.state.username}></input>
                    </div>
                    <div>
                        <input placeholder="Password"  id="password" onChange={this.handleChange} value={this.state.password1}></input>
                    </div>
                    <div>
                        <button type="submit" >Login</button>
                    </div>

                    <h1>{this.props.errors.username}</h1>
                    <h1>{this.props.errors.password}</h1>
                    <h1>{this.props.errors.userNotFound}</h1>
                </form>
            </div>
        )
    }
}

LoginContainer.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
  )(LoginContainer);
  


  
