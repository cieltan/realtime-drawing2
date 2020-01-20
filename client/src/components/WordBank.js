import React, { Component } from 'react'
import axios from 'axios';

class WordBank extends Component {
    constructor() {
        super()
        this.state = {
            word: "",
            input: "",
            showForm: true
        }
    }

    fetchWords = (word) => {
    axios.get(`https://api.datamuse.com/words?topics=${word}`)
        .then(words => {
            const newWord = words.data[Math.floor(Math.random() * 10)]["word"];
            this.setState({ 
                word: newWord
            });
            console.log(this.state.word)
        })
    }

    handleChange = (event) => {
    	this.setState({
            input: event.target.value
        })
    }

    handleSubmit = (event) => {
    	this.setState({
            showForm: false
        })
        this.fetchWords(this.state.input);
    }

    determineDisplay = () => {

    	if(this.state.showForm) {
		    return (
		        <div>
		        	<h2>Input a Category</h2>
	        		<input type="text" onChange={this.handleChange}></input>
	        		<button onClick={this.handleSubmit}>Submit</button>
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
    	let display = this.determineDisplay();
		return (
			<div> 
		        {display}
		    </div>
		);
	}
}

export default WordBank;