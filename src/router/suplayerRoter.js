const express = require("express");
const {
  creatSuplayer,
  updateSuplayer,
} = require("../controllers/suplayerController");
const userTokenVerify = require("../middleware/userTokenVerify");
const suplayerRouter = express.Router();

// creat suplayer router
suplayerRouter.post("/createSuplayer", userTokenVerify, creatSuplayer);
// update suplayer router
suplayerRouter.put("/updateSuplayer", userTokenVerify, updateSuplayer);
//
module.exports = suplayerRouter;
