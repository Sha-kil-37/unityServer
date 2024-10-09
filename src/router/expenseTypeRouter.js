// expense type router
const express = require("express");
const userTokenVerify = require("../middleware/userTokenVerify");
const {
  createExpenseType,
  updateExpenseType,
} = require("../controllers/expenseTypeController");
const expenseTypeRouter = express.Router();
//
// create expense type router
expenseTypeRouter.post(
  "/createExpenseType",
  userTokenVerify,
  createExpenseType
);
// update expense type
expenseTypeRouter.put("/updateExpenseType", userTokenVerify, updateExpenseType);
//
module.exports = expenseTypeRouter;
