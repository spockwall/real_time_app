const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const signUpTableCopy = require("../models/signup");
const { createTokens} = require("../service/jwt");

router.post("/signup", async (req, res) => {
	// res.send("send");
	const salt = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, salt);
	const signUpUser = new signUpTableCopy({
		username: req.body.username,
		email: req.body.email,
		password: securePassword,
	});
	signUpUser
		.save()
		.then((data) => {
			const token = createTokens({
				username: signUpUser.username,
				email: signUpUser.email,
			});
			res.cookie("accessToken", token, {
				maxAge: 60 * 60 * 24 * 30 * 1000, // 30days
			});
			res.status(200).send({
				message: "Sign up Successful",
			});
		})
		.catch((error) => {
			console.log(error);
			res.json(error);
		});
});

module.exports = router;
