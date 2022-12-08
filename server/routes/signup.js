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
			res.json({ token });
			const token = createTokens({
				username: signUpUser.username,
				email: signUpUser.email,
			});
			res.cookie("accessToken", token, {
				maxAge: 60 * 60 * 24 * 30 * 1000, // 30days
				// httpOnly: false,
			});
			res.status(200).send({
				message: "Login Successful",
			});
		})
		.catch((error) => {
			res.json(error);
		});
});

module.exports = router;
