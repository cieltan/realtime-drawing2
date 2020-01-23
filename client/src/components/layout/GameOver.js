import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    height: 750,
    marginLeft: "235%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const makeScoreList = (classes, users) => {
  return (
    <List className={classes.root}>
      {users.map(user => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{user.username[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.username}
              secondary={<React.Fragment>{user.score}</React.Fragment>}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
        );
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
  return <div>{determineUserDisplay(classes)}</div>;
}
