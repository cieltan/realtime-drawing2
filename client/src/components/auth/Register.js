import React, { Component } from 'react'
import axios from "axios";

class Register extends Component {

    constructor(props) {

        super(props);

        this.state ={
            email: "",
            username: "",
            password1: "'",
            password2: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        axios
        .post("http://localhost:1234/api/users/register", this.state)
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input id="email" onChange={this.handleChange} value={this.state.email}></input>
                    </div>
                    <div>
                        <input id="username" onChange={this.handleChange} value={this.state.username}></input>
                    </div>
                    <div>
                        <input id="password1" onChange={this.handleChange} value={this.state.password1}></input>
                    </div>
                    <div>
                        <input id="password2" onChange={this.handleChange} value={this.state.password2}></input>
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


  
