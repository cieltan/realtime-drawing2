const emitter = socket => {
  return io.emit("FromAPI", players);
};

let users = [];
let moves = [];

module.exports = io => {
  io.on("connection", socket => {
    console.log("New client connected");
    io.emit("sent2", { moves: moves });

    // if (interval) {
    //   clearInterval(interval);
    // }
    // interval = setInterval(() => emitter(socket), 10);

    socket.on("token", function(data) {
      let obj = {};
      obj[data] = socket.id;
      users.push(obj);
    });

    socket.on("sendy", function(data) {
      console.log(data);
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
