const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const signUpTableCopy = require("../models/signup");

router.post("/signup", async (req, res) => {
	// res.send("send");
	const salt = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, salt);
	console.log("============================");
	const signUpUser = new signUpTableCopy({
		username: req.body.username,
		email: req.body.email,
		password: securePassword,
	});
	signUpUser
		.save()
		.then((data) => {
			res.json(data);
			// console.log(data);
		})
		.catch((error) => {
			res.json(error);
			// console.log(error);
		});
});

module.exports = router;
