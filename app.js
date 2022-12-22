const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI);

app.use(express.json());

// importing routes
const login = require("./routes/login");
const members = require("./routes/member");

app.use("/login", login);
app.use("/members", members);

app.listen(PORT, (err) => {
	if (err) {
		console.log("Error starting server, ", err);
	} else {
		console.log("Server is running on PORT:", PORT);
	}
});
