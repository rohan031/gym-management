const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI);

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

app.listen(PORT, (err) => {
	if (err) {
		console.log("Error starting server, ", err);
	} else {
		console.log("Server is running on PORT:", PORT);
	}
});
