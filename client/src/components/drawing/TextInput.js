import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Scroll from "./Scroll.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marsginTop: theme.spacing(2)
    }
  }
}));

const BasicTextFields = props => {
  const classes = useStyles();

  const [words, setWords] = React.useState([]);

  const [currWord, setCurrWord] = React.useState("");

  const handleClick = () => {
    setWords([...words, currWord]);
    props.socket.emit("guessWord", currWord);
    setCurrWord("");
  };

  const handleChange = e => {
    setCurrWord(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <h1>Words You Have Guessed:</h1>
      <div className="turn-title2">
        <Scroll words={words} />
        <TextField
          id="currWord"
          label="Type Your Guess"
          variant="filled"
          type="text"
          onChange={handleChange}
          value={currWord}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          align-items="center"
          onClick={handleClick}
          disabled={props.correct || props.turn}
        >
          Enter!
        </Button>

        <div>
          <h1>{props.score === 0 ? "" : `Score: ${props.score}`}</h1>
        </div>

        <Snackbar
          open={props.open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Your guess is correct!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BasicTextFields;
