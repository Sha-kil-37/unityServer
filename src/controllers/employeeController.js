// employee controller

// employee data model
const { default: mongoose } = require("mongoose");
const employeeSalaryModel = require("../model/employeeModel/employeeSalaryModel");
const employeeTitleModel = require("../model/employeeModel/employeeTitleModel");
// services
const createService = require("../services/common/createService");
const updateService = require("../services/common/updateService");
// regex
const { nameRegex, numberRegex } = require("../utils/regex/regex");

// createEmployeeTitle controller
async function createEmployeeTitle(req, res) {
  try {
    const { title } = req.body;
    if (title === undefined) {
      return res.status(400).end("Title require");
    } else if (!nameRegex.test(title)) {
      return res.status(400).end("Invalid title");
    } else {
      const findExistData = await employeeTitleModel.findOne({
        title: title,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Tittle already exist");
      } else {
        req.body.userEmail = req.headers.email;
        createService(req, res, employeeTitleModel);
        return;
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
// updateEmployeeTittle  controller
async function updateEmployeeTitle(req, res) {
  try {
    const { title } = req.body;
    const { id } = req.query;
    if (title === undefined) {
      return res.status(400).end("Title require");
    } else if (id === undefined) {
      return res.status(400).end("Id require");
    } else if (!nameRegex.test(title)) {
      return res.status(400).end("Invalide title");
    } else {
      const findExistData = await employeeTitleModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        title: title,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Tittle already exist");
      } else {
        req.body.userEmail = req.headers.email;
        updateService(req, res, employeeTitleModel);
        return;
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
//
// creatEmployeeSalary controller
async function creatEmployeeSalary(req, res) {
  try {
    const { salary } = req.body;
    if (salary === undefined) {
      return res.status(400).end("Salary require");
    } else if (!numberRegex.test(salary)) {
      return res.status(400).end("Invalid digit");
    } else {
      const findExistData = await employeeSalaryModel.findOne({
        salary: salary,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Salary already exist");
      } else {
        req.body.userEmail = req.headers.email;
        createService(req, res, employeeSalaryModel);
        return;
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
// updateEmployeeSalary controller
async function updateEmployeeSalary(req, res) {
  try {
    const { salary } = req.body;
    const { id } = req.query;
    if (salary === undefined) {
      return res.status(400).end("Salary require");
    } else if (id === undefined) {
      return res.status(400).end("Id require");
    } else if (!numberRegex.test(salary)) {
      return res.status(400).end("Invalide title");
    } else {
      const findExistData = await employeeSalaryModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        salary: salary,
        userEmail: req.headers.email,
      });
      if (findExistData !== null) {
        return res.status(400).end("Salary already exist");
      } else {
        return updateService(req, res, employeeSalaryModel);
      }
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}

//

module.exports = {
  createEmployeeTitle,
  updateEmployeeTitle,
  creatEmployeeSalary,
  updateEmployeeSalary,
};
