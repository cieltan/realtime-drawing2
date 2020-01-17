module.exports = conns => {
  conns.on("connection", socket => {
    console.log("successfully connected");
  });
};
