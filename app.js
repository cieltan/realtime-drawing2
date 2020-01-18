// Here, we will sync our database, create our application, and export this module so that we can use it in the bin directory, where we will be able to establish a server to listen and handle requests and responses;

// Require environmental variables (if we have any) if we are in development or testing;

// if (process.env.NODE_ENV !== 'production') {
//   require('./secrets');
// }

// Module dependencies;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

// Utilities;
const createLocalDatabase = require("./utilities/createLocalDatabase");

// Our database instance;
const db = require("./database");

// Our apiRouter;
const apiRouter = require("./routes/index");

// A helper function to sync our database;
const syncDatabase = () => {
  if (process.env.NODE_ENV === "production") {
    db.sync();
  } else {
    console.log("As a reminder, the forced synchronization option is on");
    db.sync({ force: true }).catch(err => {
      if (err.name === "SequelizeConnectionError") {
        createLocalDatabase();
      } else {
        console.log(err);
      }
    });
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync()
      .catch(err => {
        if (err.name === 'SequelizeConnectionError') {
          createLocalDatabase();
        }
        else {
          console.log(err);
        }
      });
    }
};

// Instantiate our express application;
const app = express();

// A helper function to create our app with configurations and middleware;
const configureApp = () => {
    app.use(helmet());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(cookieParser());

    // Passport middleware
    app.use(passport.initialize());
    require("./bin/passport")(passport);

    app.use(cors({
        origin: "*"
    }))


    // Mount our apiRouter;
    app.use('/api', apiRouter);

    // Error handling;
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
        }
        else {
        next();
        }
    });

    // More error handling;
    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
};

// Main function declaration;
const bootApp = async () => {
  await syncDatabase();
  await configureApp();
};

// Main function invocation;
bootApp();

// Instantiate a socket instance based on server obj
var server = require("http").Server(app);
var io = require("socket.io")(server);
// var conns = require("./sockets/index")(server);

const emitter = socket => {
  console.log(Date.now());
  return socket.emit("FromAPI", Date.now());
};

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emitter(socket), 10);

  socket.on("disconnect", () => console.log("Client disconnected"));
});

// app.use(function(req, res, next) {
//   res.io = io;
//   next();
// });

// const getAndEmit = async socket => {
//   console.log("in emitter");
// };

// let interval;
// io.on("connection", socket => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getAndEmit(socket), 10000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// server.listen(5000, () => console.log(`Listening on port`));

// Export our app, so that it can be imported in the www file;
module.exports = { app: app, server: server };
