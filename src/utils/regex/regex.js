// regex for testing field
const regexObject = {
  nameRegex: /^[a-zA-Z ]+$/,
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  numberRegex: /^\d+$/,
};

module.exports = regexObject;
