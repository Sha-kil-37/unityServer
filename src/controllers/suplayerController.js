const { mongo, default: mongoose } = require("mongoose");
const suplayerModel = require("../model/suplayerModel/suplayerModel");
const createService = require("../services/common/createService");
const { nameRegex, emailRegex, numberRegex } = require("../utils/regex/regex");
const updateService = require("../services/common/updateService");

// creat suplayer controller
async function creatSuplayer(req, res) {
  try {
    const { suplayerName, suplayerEmail, suplayerNumber } = req.body;
    if (suplayerName === undefined) {
      return res.status(400).end("Suplayer name require");
    } else if (!nameRegex.test(suplayerName)) {
      return res.status(400).end("Invalid name");
    } else if (suplayerEmail === undefined) {
      return res.status(400).end("Suplayer email require");
    } else if (!emailRegex.test(suplayerEmail)) {
      return res.status(400).end("Invalid email");
    } else if (suplayerNumber === undefined) {
      return res.status(400).end("Suplayer number require");
    } else if (!numberRegex.test(suplayerNumber)) {
      return res.status(400).end("Invalid number");
    } else {
      const findExistData = await suplayerModel.findOne({
        suplayerName: suplayerName,
        suplayerEmail: suplayerEmail,
        suplayerNumber: suplayerNumber,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Suplayer already exist");
      } else {
        req.body.userEmail = req.headers.email;
        return createService(req, res, suplayerModel);
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
// update suplayer controller
async function updateSuplayer(req, res) {
  try {
    const { suplayerName, suplayerEmail, suplayerNumber } = req.body;
    const { id } = req.query;
    if (id === undefined) {
      return res.status(400).end("Id require");
    } else if (suplayerName === undefined) {
      return res.status(400).end("Suplayer name require");
    } else if (!nameRegex.test(suplayerName)) {
      return res.status(400).end("Invalid name");
    } else if (suplayerEmail === undefined) {
      return res.status(400).end("Suplayer email require");
    } else if (!emailRegex.test(suplayerEmail)) {
      return res.status(400).end("Invalid email");
    } else if (suplayerNumber === undefined) {
      return res.status(400).end("Suplayer number require");
    } else if (!numberRegex.test(suplayerNumber)) {
      return res.status(400).end("Invalid number");
    } else {
      const findExistData = await suplayerModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        suplayerName: suplayerName,
        suplayerEmail: suplayerEmail,
        suplayerNumber: suplayerNumber,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Suplayer already exist");
      } else {
        req.body.userEmail = req.headers.email;
        return updateService(req, res, suplayerModel);
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
module.exports = { creatSuplayer, updateSuplayer };
