const express = require("express");
const route = express.Router();

const {
	createMember,
	getMembers,
	getMember,
	updateDuration,
	deleteMember,
} = require("../controllers/member");

route.get("/", getMembers);
route.post("/create", createMember);
route.get("/:memberId", getMember);
route.post("/update", updateDuration);
route.delete("/:memberId", deleteMember);

module.exports = route;
