const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	plan: {
		type: Number,
		required: true,
	},
	contact: {
		type: Number,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Member", memberSchema);
