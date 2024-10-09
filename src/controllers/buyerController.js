// createBuyer controller

const mongoose = require("mongoose");
const buyerModel = require("../model/buyerModel/buyerModel");
const createService = require("../services/common/createService");
const { nameRegex, emailRegex, numberRegex } = require("../utils/regex/regex");
const updateService = require("../services/common/updateService");
// create buyer
async function createBuyer(req, res) {
  try {
    const { buyerName, buyerEmail, buyerNumber } = req.body;
    if (buyerName === undefined) {
      return res.status(400).end("buyer name require");
    } else if (!nameRegex.test(buyerName)) {
      return res.status(400).end("Invalid name");
    } else if (buyerEmail === undefined) {
      return res.status(400).end("buyer email require");
    } else if (!emailRegex.test(buyerEmail)) {
      return res.status(400).end("Invalid email");
    } else if (buyerNumber === undefined) {
      return res.status(400).end("buyer number require");
    } else if (!numberRegex.test(buyerNumber)) {
      return res.status(400).end("Invalid number");
    } else {
      const findExistData = await buyerModel.findOne({
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerNumber: buyerNumber,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("buyer already exist");
      } else {
        req.body.userEmail = req.headers.email;
        return createService(req, res, buyerModel);
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}

//update buyer
async function updateBuyer(req, res) {
  try {
    const { buyerName, buyerEmail, buyerNumber } = req.body;
    const { id } = req.query;
    if (id === undefined) {
      return res.status(400).end("Id require");
    } else if (buyerName === undefined) {
      return res.status(400).end("Buyer name require");
    } else if (!nameRegex.test(buyerName)) {
      return res.status(400).end("Invalid name");
    } else if (buyerEmail === undefined) {
      return res.status(400).end("Buyer email require");
    } else if (!emailRegex.test(buyerEmail)) {
      return res.status(400).end("Invalid email");
    } else if (buyerNumber === undefined) {
      return res.status(400).end("Buyer number require");
    } else if (!numberRegex.test(buyerNumber)) {
      return res.status(400).end("Invalid number");
    } else {
      const findExistData = await buyerModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerNumber: buyerNumber,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Buyer already exist");
      } else {
        req.body.userEmail = req.headers.email;
        return updateService(req, res, buyerModel);
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
   
    
  }
}
module.exports = { createBuyer, updateBuyer };
