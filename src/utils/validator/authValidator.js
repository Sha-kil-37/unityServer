const { check, query } = require("express-validator");
// user signUp validator
const userSignUpValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];
// user signIn validator
const userSignInValidator = [
  query("email").isEmail().withMessage("Please provide a valid email"),
  query("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// 
module.exports = { userSignUpValidator, userSignInValidator };
