const Member = require("../database/memberSchema");
const { all } = require("../routes/login");

const createMember = async (req, res) => {
	const { id, name, plan, contact, duration } = req.body;

	if (!id || !name || !plan || !contact || !duration) {
		return res.status(400).json({
			status: false,
			msg: "Didn't get required details!",
		});
	}

	if (await Member.exists({ id: id })) {
		return res.status(400).json({
			status: false,
			msg: "Member with this ID exists!",
		});
	}

	let endDate = new Date();

	endDate.setDate(endDate.getDate() + duration);

	const newMember = new Member({ id, name, plan, contact, endDate });

	await newMember.save((err, result) => {
		if (err) {
			return res.status(502).json({
				success: false,
				msg: "Can't create new Member right now. Please try again later!",
			});
		}
	});

	return res.status(200).json({
		success: true,
		msg: "Successfully created new Member.",
	});
};

const getMembers = async (req, res) => {
	const allMembers = await Member.find({});

	let today = new Date();

	const memberArr = allMembers.map((member) => {
		let endDate = member.endDate;

		let timeDiff = endDate.getTime() - today.getTime();

		let dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		let tempStatus = dayDiff > 7 ? "0" : dayDiff < 1 ? "2" : "1";

		const tempMember = {
			id: member.id,
			name: member.name,
			plan: member.plan,
			contact: member.contact,
			// daysLeft: tempStatus == "2" ? 0 : dayDiff,
			daysLeft: dayDiff,
			status: tempStatus,
		};

		return tempMember;
	});

	return res.status(200).json({
		success: true,
		data: memberArr,
	});
};

const getMember = async (req, res) => {
	const { memberId: id } = req.params;

	const member = await Member.findOne({ id });

	if (!member) {
		return res.status(400).json({
			success: false,
			msg: "No user with this ID exists!",
		});
	}

	let today = new Date();
	let endDate = member.endDate;

	let timeDiff = endDate.getTime() - today.getTime();

	let dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	let tempStatus = dayDiff > 7 ? "0" : dayDiff < 1 ? "2" : "1";

	const tempMember = {
		id: member.id,
		name: member.name,
		plan: member.plan,
		contact: member.contact,
		daysLeft: tempStatus == "2" ? 0 : dayDiff,
		status: tempStatus,
	};

	return res.status(200).json({
		success: true,
		data: tempMember,
	});
};

const updateDuration = async (req, res) => {
	const { id, duration } = req.body;

	if (!id || !duration) {
		return res.status(400).json({
			success: false,
			msg: "Id or Duration undefined!",
		});
	}

	let member = await Member.findOne({ id });

	if (!member) {
		return res.status(400).json({
			success: false,
			msg: "Member with this ID doesn't exist!",
		});
	}

	let endDate = new Date();

	endDate.setDate(endDate.getDate() + duration);

	member.endDate = endDate;

	await member.save((err, result) => {
		if (err) {
			return res.status(502).json({
				success: false,
				msg: "Can't update Member details right now. Please try again later!",
			});
		}
	});

	return res.status(200).json({
		success: true,
		msg: "Successfully updated Member's duration.",
	});
};

const deleteMember = async (req, res) => {
	const { memberId: id } = req.params;

	if (!id) {
		return res.status(400).json({
			success: false,
			msg: "Invalid ID!",
		});
	}

	if (!(await Member.findOne({ id }))) {
		return res.status(400).json({
			success: false,
			msg: "Member with this User ID doesn't exist!",
		});
	}

	await Member.deleteOne({ id })
		.then(() => {
			return res.status(200).json({
				success: true,
				msg: "Successfully deleted the member",
			});
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				msg: "Can't delete memeber right now. Try again later!",
			});
		});
};

module.exports = {
	createMember,
	getMembers,
	getMember,
	updateDuration,
	deleteMember,
};
