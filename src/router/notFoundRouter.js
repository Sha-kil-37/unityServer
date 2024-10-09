
// express
const express = require("express");
const notFount = require("../controllers/notFoundController");
// express router
const notFoundRouter = express.Router();
notFoundRouter.get("*", notFount);
//
module.exports = notFoundRouter;
