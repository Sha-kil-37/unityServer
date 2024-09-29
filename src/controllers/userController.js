const { validationResult, body } = require("express-validator");
const createService = require("../services/createService");
const regexObject = require("../utils/regex/regex");
const userModel = require("../model/userModel");
const { hashPassword } = require("../utils/helper/bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

// signup user
async function userSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { name, email, password } = req.body;
    if (!regexObject.nameRegex.test(name)) {
      return res.status(400).end("Invalid name");
    } else if (!regexObject.emailRegex.test(email)) {
      return res.status(400).end("Invalid email");
    } else if (!regexObject.passwordRegex.test(password)) {
      return res.status(400).end("Invalid password");
    } else {
      const findUser = await userModel.findOne({ email: email });
      if (findUser) {
        return res.status(400).end("This email already use");
      } else {
        const newPassword = await hashPassword(password);
        if (newPassword) {
          req.body.password = newPassword;
          return createService(req, res, userModel);
        } else {
          return res.status(500).end("server error");
        }
      }
    }
  }
}
//
// signin user
async function userSignIn(req, res) {
  try {
    const user = await userModel.findOne(
      { email: req.query.email },
      { email: 0, password: 0, name: 0, _id: 1 }
    );
    if (user) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          token: user._id,
        },
        tokenSecret
      );
      if (token) {
        return res.append("token", token).end("SignIn success");
      } else {
        return res.status(500).end("Server error");
      }
    } else {
      return res.status(400).end("Invalid email");
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}

module.exports = { userSignUp, userSignIn };
