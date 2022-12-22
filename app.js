const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

app.use(express.static("client/build"));

app.use(express.json());

// importing routes
const login = require("./routes/login");
const members = require("./routes/member");

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.use("/login", login);
app.use("/members", members);

//Connect to the database before listening
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("listening for requests");
	});
});
