const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// mongoose schema
const Admin = require("../database/adminSchema");

// generate jwt
function generateToken(payload, key, exp) {
	return jwt.sign(payload, key, { expiresIn: `${exp}s` });
}

const createAdmin = async (req, res) => {
	const { username, password } = req.body;

	if (await Admin.exists({ username: "admin" })) {
		return res.status(400).json({
			success: false,
			msg: "Admin user already exists!",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const admin = new Admin({ username, password: hashedPassword });

	await admin.save((err, result) => {
		if (err) {
			return res.status(502).json({
				success: false,
				msg: "Can't create admin account right now. Please try again later!",
			});
		}
	});

	return res.status(200).json({
		success: true,
		msg: "Successfully created admin account.",
	});
};

const login = async (req, res) => {
	const { username, password, isAdmin } = req.body;

	if (username === "admin") {
		const adminInfo = await Admin.findOne({ username: "admin" });

		if (!(await bcrypt.compare(password, adminInfo.password))) {
			return res
				.status(403)
				.json({ success: false, msg: "Incorrect password! Try again" });
		}
	} else {
		return res.status(404).json({
			success: false,
			msg: "Incorrect Admin username!",
		});
	}

	const accessToken = generateToken(
		{ isAdmin: isAdmin },
		process.env.SECRET_KEY,
		3600
	);

	return res.status(200).json({
		success: true,
		token: accessToken,
		isAdmin: isAdmin,
	});
};

const validate = (req, res) => {
	const { token } = req.body;

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		res.status(200).json({
			success: true,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			msg: "Invalid Token!",
		});
	}
};

module.exports = {
	createAdmin,
	login,
	validate,
};
