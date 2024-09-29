const mongoose = require("mongoose");
require("dotenv").config();
const dbUri = process.env.DB_URI;
//

async function dbConnect() {
  await mongoose
    .connect(dbUri)
    .then(() => console.log("DB Connected"))
    .catch(() => {
      console.log("DB Connecting faild");
    });
}

module.exports = dbConnect;
