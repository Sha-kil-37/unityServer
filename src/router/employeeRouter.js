// express
const express = require("express");
// user token verify middleware
const userTokenVerify = require("../middleware/userTokenVerify");
// createEmployeeTitle controller
const {
  createEmployeeTitle,
  updateEmployeeTitle,
  updateEmployeeSalary,
} = require("../controllers/employeeController");
const { creatEmployeeSalary } = require("../controllers/employeeController");

// express router
const employeeRouter = express.Router();
// creatEmployeeTitle router
employeeRouter.post(
  "/createEmployeeTitle",
  userTokenVerify,
  createEmployeeTitle
);
// updateEmployeeTitle router
employeeRouter.put(
  "/updateEmployeeTitle",
  userTokenVerify,
  updateEmployeeTitle
);
//createEmployeeSalary router
employeeRouter.post(
  "/createEmployeeSalary",
  userTokenVerify,
  creatEmployeeSalary
);
// updateEmployeeSalary router
employeeRouter.put(
  "/updateEmployeeSalary",
  userTokenVerify,
  updateEmployeeSalary
);
module.exports = employeeRouter;
