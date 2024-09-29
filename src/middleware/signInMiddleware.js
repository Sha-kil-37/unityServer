const { validationResult } = require("express-validator");
const regexObject = require("../utils/regex/regex");
const { comparePassword } = require("../utils/helper/bcrypt");
const userModel = require("../model/userModel");

// sign in middleware
async function signInMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password } = req.query;
    if (!regexObject.emailRegex.test(email)) {
      return res.status(400).end("Invalid email");
    } else if (!regexObject.passwordRegex.test(password)) {
      return res.status(400).end("Invalid password");
    } else {
      const hashPassword = await comparePassword(password, email, userModel);
      if (hashPassword === "compare success") {
        next();
      } else if (hashPassword === "invalid email") {
        return res.status(400).end("Invalid email");
      } else if (hashPassword === "wrong password") {
        return res.status(400).end("Invalid password");
      }
    }
  }
}

module.exports = signInMiddleware;
