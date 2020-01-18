const express = require("express");
const router = express.Router();

// Subrouters;
const userRouter = require("./user");
const socketRouter = require("./socket");

// Mount our subrouters to assemble our apiRouter;
router.use("/users", userRouter);
router.use("/socket", socketRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;
