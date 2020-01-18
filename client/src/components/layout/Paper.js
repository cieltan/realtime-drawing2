import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
    //   margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(60),
    },
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className="paper">
    <div className={classes.root}>
      <Paper elevation={0} />
    </div>
    </div>
  );
}