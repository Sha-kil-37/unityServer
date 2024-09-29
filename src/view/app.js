const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { validationResult } = require("express-validator");
const userRouter = require("../router/userRouter");
app.use(bodyParser.json());
app.use(cors());
app.use("/unity/api/v1", userRouter);




module.exports = app;
