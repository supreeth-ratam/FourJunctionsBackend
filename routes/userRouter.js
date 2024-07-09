const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.route("/adduser").post(userController.addUser);
Router.route("/login").post(userController.loginUser);
Router.route("/").get(authController.protect, userController.getAllUsers);
module.exports = Router;
