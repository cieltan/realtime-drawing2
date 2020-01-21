// declare interval for server based turn logic

// {socket id : token}
let userMap = {};
// keep an array of users, first index being whose turn it is
let users = [];

// keep a list of moves made by the user whose turn it is
let moves = [];

let startOfTurn = undefined;

let turnTime;

// rotate an array like a deque
// https://stackoverflow.com/a/33451102
const arrayRotate = (arr, count) => {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
};

// logic for when the time interval has completed
// rotates users array (mutation side effect)
// emits new drawing
// emits to to next user it's their turn
const emitter = (io, socket, users, userMap) => {};

module.exports = io => {
  // execute whenever a new socket connects
  io.on("connection", socket => {
    // sanity check log
    users.push(socket.id);
    console.log("New client connected");

    io.to(users[0]).emit("turn", 1);

    // get new client's token and associate it with socket id
    socket.on("token", data => {
      userMap[socket.id] = data;
    });

    // event in which the player has drawn
    socket.on("newPositionData", data => {
      // broadcast new drawing points to everyone
      io.emit("newDrawingData", data);
      // add to the moves array so new clients receive all the work until that point
      moves.push(data);
    });

    socket.on("startDrawing", () => {
      let timeLeft = 30;

      turnTime = setInterval(() => {
        io.emit("updateTime", timeLeft);
        timeLeft--;

        if (timeLeft === -1) {
          clearInterval(turnTime);
          console.log(`it is time: ${Date.now()}`);
          io.to(users[0]).emit("endTurn", -1);
        }
      }, 1000);
    });

    socket.on("changedTurn", () => {
      io.emit("changedTurn", -1);
      moves = [];
      arrayRotate(users, 1);
      io.to(users[0]).emit("turn", 1);
    });
    // event for new clients to receive drawings already in progress
    io.emit("initialize", { moves: moves, startOfTurn: startOfTurn });

    // execute whenever a connected socket disconnects
    socket.on("disconnect", () => {
      for (let i = 0; i < users.length; ++i) {
        if (socket.id === users[i]) {
          users.splice(i, 1);

          if (i === 0) {
            if (users.length > 0) {
              io.emit("changedTurn", -1);
              io.to(users[0]).emit("turn", 1);
            }

            moves = [];
          }
        }
      }
      // sanity check log
      console.log("Client disconnected");
    });
  });
};
