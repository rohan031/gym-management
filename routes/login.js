const express = require("express");

const route = express.Router();

const { createAdmin, login, validate } = require("../controllers/login");

route.post("/", login);

route.post("/create-admin", createAdmin);

route.post("/validate", validate);

module.exports = route;
