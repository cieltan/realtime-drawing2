import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
// import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
  }));
  
  export default function NavBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Draw This!
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//       backgroundColor: "pink",
//     },
//   },
// }));

// function Navbar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static" color = "pink">
//         <Toolbar>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Draw this!
//           </Typography>
//           {/* <IconButton> 
//             <Link to="/campuses">       
//               <SchoolIcon style={{fill: "white"}}/>
//             </Link>
//           </IconButton> */}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default Navbar;