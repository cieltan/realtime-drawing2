import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import EjectIcon from "@material-ui/icons/Eject";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  }
}));

const userCard = (user, avatar) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={<React.Fragment>{user.score}</React.Fragment>}
      />
    </ListItem>
  );
};
const makeScoreList = (classes, users) => {
  return (
    <List className={classes.root}>
      <Link to="/dashboard">
        <Button variant="contained" color="primary">
          Dashboard
        </Button>
      </Link>
      {userCard(users[0], <EjectIcon />)}
      {users.slice(1).map(user => {
        return userCard(user, user.username[0]);
      })}
    </List>
  );
};

export default function GameOver(props) {
  const classes = useStyles();

  const determineUserDisplay = classes => {
    const users = props.users;
    users.sort((a, b) => b.score - a.score);
    return makeScoreList(classes, users);
  };
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          {determineUserDisplay(classes)}
        </Grid>
      </Grid>
    </div>
  );
}
