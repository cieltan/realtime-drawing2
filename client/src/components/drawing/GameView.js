import React, {Component}from 'react'
// import { connect } from "react-redux";
// import { getStudentThunk, fetchStudentsThunk } from "../../store/utilities/students";
import AvatarPic from "../layout/Avatar.js"
import Avatar from '@material-ui/core/Avatar';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import EmailIcon from '@material-ui/icons/Email';
import SchoolIcon from '@material-ui/icons/School';
import Paper from '../layout/Paper';
import WordPopUp from './WordPopUp';

class GameView extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state ={
    //         currStudent: {}
    //     };
    // }

    render(){

        return (
            <div className="game">
            <div className="word"><WordPopUp></WordPopUp></div>
            <div className="alignment">
                <div className="profile-box">
                <div className="image"><AvatarPic></AvatarPic></div>
                <h2 className="turn-title">
                    <ListItemText primary= "YOUR TURN!" />
                </h2>
                <ListItem className="info">
                <ListItemAvatar className="avatar">
                    <Avatar>
                        <FingerprintIcon />
                    </Avatar>
                </ListItemAvatar>
                    <ListItemText primary="Username" secondary= "This user's username" />
                </ListItem>
                <ListItem className="info">
                <ListItemAvatar className="avatar">
                    <Avatar>
                        <SchoolIcon />
                    </Avatar>
                </ListItemAvatar>
                    <ListItemText primary="Score" secondary="0" />
                </ListItem>
                </div>
                <div className="paper"><Paper></Paper></div>
           </div>
           </div>
        )
    }
}

export default GameView;