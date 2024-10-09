const mongoose = require("mongoose");
//employee title schema
const employeeTitleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const employeeTitleModel = mongoose.model("employeeTitle", employeeTitleSchema);

//
module.exports = employeeTitleModel;
