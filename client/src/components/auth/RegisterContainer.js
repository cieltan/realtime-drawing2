import React, { Component } from 'react'
import {registerUser} from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types"

class RegisterContainer extends Component {

    constructor(props) {

        super(props);

        this.state ={
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        }
    }

    componentDidMount() {
        const {auth, history} = this.props
        
        if(auth.isAuthenticated) { 
            history.push("/dashboard") 
        }
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
        this.props.registerUser(this.state, this.props.history);
    }

    render() {

        return (
            <div>
                <h1>Register</h1>
                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input placeholder="Email" id="email" onChange={this.handleChange} value={this.state.email}></input>
                    </div>
                    <div>
                        <input placeholder="Username"  id="username" onChange={this.handleChange} value={this.state.username}></input>
                    </div>
                    <div>
                        <input placeholder="Password"  id="password" onChange={this.handleChange} value={this.state.password1}></input>
                    </div>
                    <div>
                        <input placeholder="Confirm Password"  id="confirmPassword" onChange={this.handleChange} value={this.state.password1}></input>
                    </div>
                    <div>
                        <button type="submit" >Register</button>
                    </div>

                    <h1>{this.props.errors.email}</h1>
                    <h1>{this.props.errors.username}</h1>
                    <h1>{this.props.errors.password}</h1>
                    <h1>{this.props.errors.confirmPassword}</h1>
                    <h1>{this.props.errors.userFound}</h1>
                </form>
            </div>
        )
    }
}

RegisterContainer.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
  )(RegisterContainer);
  


  
