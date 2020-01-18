// declare interval for server based turn logic
let interval;

// keep an array of
// {token id: socket id}
let users = [];
// keep a list of moves made
let moves = [];

// logic for when the time interval has completed
const emitter = socket => {
  console.log(`it is time: ${Date.now()}`);
  return "hi"; //io.emit("FromAPI", players);
};

module.exports = io => {
  io.on("connection", socket => {
    console.log("New client connected");
    io.emit("sent2", { moves: moves });

    // reset timer
    if (interval) {
      clearInterval(interval);
    }

    // print message every 60 seconds
    interval = setInterval(() => emitter(socket), 60000);

    socket.on("token", function(data) {
      let obj = {};
      obj[data] = socket.id;
      users.push(obj);
    });

    socket.on("sendy", function(data) {
      // console.log(data);
      moves.push(data);
      io.emit("sent", { moves: moves });
    });

    socket.on("disconnect", () => {
      //users = users.filter(user => user.values[0])
      // console.log(users);
      // console.log(socket.id);
      // users = users.filter(user => Object.values(user)[0] === socket.id);
      console.log("Client disconnected");
      // console.log(users);
    });
  });
};
