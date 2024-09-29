const express = require("express");
const { userSignUp, userSignIn } = require("../controllers/userController");
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../utils/validator/authValidator");
const signInMiddleware = require("../middleware/signInMiddleware");
const userRouter = express.Router();
//

// user signup route
userRouter.post("/userSignUp", userSignUpValidator, userSignUp);

// user signin route
userRouter.get(
  "/userSignIn",
  userSignInValidator,
  signInMiddleware,
  userSignIn
);

//
module.exports = userRouter;
