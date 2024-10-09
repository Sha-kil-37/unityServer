// .env
require("dotenv").config();
// express
const express = require("express");
// express router
const userRouter = express.Router();
// express-validator
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../utils/validator/authValidator");
// user signIn middleware
const signInMiddleware = require("../middleware/signInMiddleware");
// token verify middleware
const userTokenVerify = require("../middleware/userTokenVerify");
// multer
const userProfileUploadMulter = require("../utils/Multer/userProfileUploadMulter");
// user controllers
const {
  userSignUp,
  userSignIn,
  userProfileUpload,
} = require("../controllers/userController");

// user signup route
userRouter.post("/userSignUp", userSignUpValidator, userSignUp);

// user signin route
userRouter.get(
  "/userSignIn",
  userSignInValidator,
  signInMiddleware,
  userSignIn
);
// user profile upload
userRouter.post(
  "/userProfileUpload",
  userTokenVerify,
  userProfileUploadMulter.single("userProfile"),
  userProfileUpload
);

//
module.exports = userRouter;
