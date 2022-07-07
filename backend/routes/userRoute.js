const express = require("express");

const { createUser } = require("../controllers/userController");
const routes = express.Router();

routes.route("/register").post(createUser);

module.exports = routes;
