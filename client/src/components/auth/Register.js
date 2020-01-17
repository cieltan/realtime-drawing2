import React, { Component } from 'react'
import axios from "axios";

class Register extends Component {

    constructor(props) {

        super(props);

        this.state ={
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post("/api/users/register", this.state)
        .then((res) => console.log(res.data))
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
                </form>
            </div>
        )
    }
}
  
export default Register;


  
