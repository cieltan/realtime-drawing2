import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        align-items="center"
                        onClick={this.handleSubmit}
                    >
                    Get a Word!
                    </Button>
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