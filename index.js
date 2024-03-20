const mongoose = require("mongoose");
const express = require("express");

mongoose.connect(
	"mongodb+srv://admin:admin33@cluster0.o7jvuqc.mongodb.net/user_app",
);

const User = mongoose.model("Users", {
	name: "String",
	email: "String",
	password: "String",
});

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
		return res.status(400).json({ message: "User already exists" });
	}
	const user = new User(name, email, password);
	user.save();
	res.status(200).json({ message: "User created successfully" });
});
