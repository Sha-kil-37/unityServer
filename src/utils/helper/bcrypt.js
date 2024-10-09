const bcrypt = require("bcrypt");
// hash password
async function hashPassword(password) {
  try {
    return await bcrypt.hash(password.toString(), 10);
  } catch (err) {
    return null;
  }
}
// compare password
async function comparePassword(password, email, model) {
  const hashPassword = await model.findOne(
    {
      email: email,
    },
    { _id: 0, name: 0, email: 0 }
  );
  if (hashPassword === null) {
    return "invalid email";
  } else {
    const passwordCompare = await bcrypt.compare(
      password,
      hashPassword.password
    );
    if (passwordCompare) {
      return "compare success";
    } else {
      return "wrong password";
    }
  }
}
module.exports = { hashPassword, comparePassword };
