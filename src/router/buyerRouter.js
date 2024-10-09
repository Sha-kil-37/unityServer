const express = require("express");
const { createBuyer, updateBuyer } = require("../controllers/buyerController");
const userTokenVerify = require("../middleware/userTokenVerify");
const buyerRouter = express.Router();

// create buyer router
buyerRouter.post("/createBuyer", userTokenVerify, createBuyer);
//update buyer router
buyerRouter.put("/updateBuyer", userTokenVerify, updateBuyer);
module.exports = buyerRouter;
