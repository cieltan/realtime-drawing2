import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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
  const [open, setOpen] = React.useState(false);

  const [words, setWords] = React.useState([]);

  const [currWord, setCurrWord] = React.useState("");
  const [correct, setCorrect] = React.useState(false);

  useEffect(() => {
    props.socket.on("guessWord", data => {
      setCorrect(data);
      setOpen(data);
    });
    // we don't really have a dependency for socket emits
  }, []);

  const handleClick = () => {
    setWords([...words, currWord]);
    props.socket.emit("guessWord", currWord);
  };

  const handleChange = e => {
    setCurrWord(e.target.value);
    console.log(currWord);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <h1>Words You Have Guessed:</h1>
      {words.map(elem => {
        return (
          <div>
            <p>{elem}</p>
          </div>
        );
      })}
      <div className="turn-title2">
        <TextField
          id="currWord"
          label="Type Your Guess"
          variant="filled"
          type="text"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          align-items="center"
          onClick={handleClick}
          disabled={correct}
        >
          Enter!
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Your guess is correct!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BasicTextFields;
