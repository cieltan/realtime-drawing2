import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Scroll from "./Scroll.js";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicTextFields() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [words, setWords] = React.useState([]);

  const [currWord, setCurrWord] = React.useState("");
  const [correct, setCorrect] = React.useState(false);


  const handleClick = () => {

     setWords([...words, currWord]);

     if(currWord === "hi") {
        setOpen(true);
        setCorrect(true);
     }
  };

  const handleChange = (e) => {
      setCurrWord(e.target.value);
      console.log(currWord);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <div className={classes.root}>
          <h1>Words You Have Guessed:</h1>
    <div className="turn-title2">
    <Scroll words={words}/>
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
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
}