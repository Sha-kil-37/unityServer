// user request token verify
require("dotenv").config();
//jwt
const jwt = require("jsonwebtoken");
//
async function userTokenVerify(req, res, next) {
  // console.log(req.headers.token);
  if (req.headers.token === undefined) {
    return res.status(400).end("unauthorize");
  } else {
    jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (error, decode) => {
      if (error) {
        return res.status(400).end("unauthorize");
      } else {
        req.headers.email = decode.token;
        next();
      }
    });
  }
}
module.exports = userTokenVerify;
