// declare interval for server based turn logic
let interval;

// keep an array of
// {token : socket id}
let users = [];
// keep a list of moves made
let moves = [];

// logic for when the time interval has completed
const emitter = socket => {
  console.log(`it is time: ${Date.now()}`);
  return "hi"; //io.emit("FromAPI", players);
};

module.exports = io => {
  // execute whenever a new socket connects
  io.on("connection", socket => {
    // sanity check log
    console.log("New client connected");

    // event for new clients to receive drawings already in progress
    io.emit("initialize", { moves: moves });

    // reset timer
    if (interval) {
      clearInterval(interval);
    }

    // print message every 60 seconds
    interval = setInterval(() => emitter(socket), 60000);

    // get new client's token and associate it with socket id
    socket.on("token", data => {
      let obj = {};
      obj[data] = socket.id;
      users.push(obj);
    });

    // event in which the player has drawn
    socket.on("newPositionData", data => {
      // broadcast new drawing points to everyone
      io.emit("newDrawingData", data);
      // add to the moves array so new clients receive all the work until that point
      moves.push(data);
    });

    // execute whenever a connected socket disconnects
    socket.on("disconnect", () => {
      // sanity check log
      console.log("Client disconnected");
    });
  });
};
