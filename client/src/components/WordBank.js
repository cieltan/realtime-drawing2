import React, { Component } from 'react'
import axios from 'axios';

class WordBank extends Component {
    constructor() {
        super()
        this.state = {
            word: "",
            showForm: true
        }
    }

    fetchWord = (word) => {
        axios
        .get("/api/users/generateWord")
        .then( (res) => {
            this.setState({ 
                word: res.data
            });
        });
    }

    handleSubmit = (event) => {
    	this.setState({
            showForm: false
        })
        this.fetchWord();
    }

    determineDisplay = () => {

    	if(this.state.showForm) {
		    return (
		        <div>
	        		<button onClick={this.handleSubmit}>Get a Word</button>
		        </div>
		    );
		}
		else{
			return (
		        <div>
                    {this.state.word}
		        </div>
		    );
		}
    }

	render() {
    	let display = this.determineDisplay()
		return (
			<div> 
		        {display}
		    </div>
		);
	}
}

export default WordBank;