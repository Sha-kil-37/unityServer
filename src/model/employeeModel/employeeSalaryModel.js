const mongoose = require("mongoose");
//employee salary schema
const employeeSalarySchema = new mongoose.Schema(
  {
    salary: { type: Number, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const employeeSalaryModel = mongoose.model("employeeSalary", employeeSalarySchema);

//
module.exports = employeeSalaryModel;
