// express-validator
const { validationResult } = require("express-validator");
//.env
require("dotenv").config();
// regex
const regexObject = require("../utils/regex/regex");
// user data model
const userModel = require("../model/userModel/userModel");
// jwt
const jwt = require("jsonwebtoken");
// bcrypt
const { hashPassword } = require("../utils/helper/bcrypt");
// token secret
const tokenSecret = process.env.TOKEN_SECRET;
// services
const createService = require("../services/common/createService");
// cloudinary
const deleteImage = require("../utils/cloudinary/deleteImage");
const chekImageExist = require("../utils/cloudinary/checkImageExist");
const uploadImage = require("../utils/cloudinary/uploadImage");


// user signup controller
async function userSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { name, email, password } = req.body; //distructure from req body
    if (!regexObject.nameRegex.test(name)) {
      return res.status(400).end("Invalid name");
    } else if (!regexObject.emailRegex.test(email)) {
      return res.status(400).end("Invalid email");
    } else if (!regexObject.passwordRegex.test(password)) {
      return res.status(400).end("Invalid password");
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
//
// usersign controller
async function userSignIn(req, res) {
  try {
    // find user by  user email
    const user = await userModel.findOne(
      { email: req.query.email },
      { _id: 0, name: 0, password: 0 }
    );
    if (user !== null) {
      // genarate a token
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          token: user.email,
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
// user profile upload controller
async function userProfileUpload(req, res) {
  if (req.file === undefined) {
    return res.status(400).end("file require");
  } else {
    // chech profile image exist before new upload
    const checkImageExistResult = await chekImageExist(
      "unityUserProfileUpload",
      req.headers.email
    );
    if (checkImageExistResult.resources.length > 0) {
      // delete old profile before upload new profile
      const imageDeleteResult = await deleteImage(
        "unityUserProfileUpload",
        req.headers.email
      );
      if (imageDeleteResult.result === "ok") {
        const uploadResult = await uploadImage(
          req.file.path,
          req.headers.email,
          "unityUserProfileUpload",
          200,
          200
        );
        if (uploadResult) {
          const data = await userModel.updateOne(
            { email: req.headers.email },
            { $set: { profile: uploadResult.secure_url } }
          );
          if (data.acknowledged === true) {
            return res.status(200).end("Profile upload successfully");
          } else {
            return res.status(500).end("Server error");
          }
        } else {
          return res.status(500).end("Server error");
        }
      }
    }
    {
      const uploadResult = await uploadImage(
        req.file.path,
        req.headers.email,
        "unityUserProfileUpload",
        200,
        200
      );
      if (uploadResult) {
        const data = await userModel.updateOne(
          { email: req.headers.email },
          { $set: { profile: uploadResult.secure_url } }
        );
        if (data.acknowledged === true) {
          return res.status(200).end("Profile upload successfully");
        } else {
          return res.status(500).end("Server error");
        }
      } else {
        return res.status(500).end("Server error");
      }
    }
  }
}

// change password and forgot password baki thaklo
module.exports = {
  userSignUp,
  userSignIn,
  userProfileUpload,
};
