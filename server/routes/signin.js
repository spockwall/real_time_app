const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/signup"); // the collection

router.post("/signin", async (req, res) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			bcrypt
				.compare(req.body.password, user.password)
				.then((passwordCheck) => {
					// check if password matches
					if (!passwordCheck) {
						return res.status(400).send({
							message: "Passwords does not match",
							error,
						});
					}
					//   create JWT token
					// const token = jwt.sign(
					// 	{
					// 		userId: user._id,
					// 		userEmail: user.email,
					// 	},
					// 	"RANDOM-TOKEN",
					// 	{ expiresIn: "24h" }
					// );
					res.status(200).send({
						message: "Login Successful",
						username: user?.username,
						token,
					});
				})
				.catch((error) => {
					res.status(400).send({
						message: "Passwords does not match",
						error,
					});
				});
		})
		.catch((error) => {
			res.status(404).send({
				message: "user not found",
				error,
			});
		});
});

module.exports = router;
