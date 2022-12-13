const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/signup"); // the collection
const { createTokens, validateToken } = require("../service/jwt");

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
					const token = createTokens(user);
					res.cookie("accessToken", token, {
						maxAge: 60 * 60 * 24 * 30 * 1000, // 30days
						sameSite: "none",
						secure: true,
						domain: "computer-network-phase2-server.onrender.com",
						httpOnly: true,
					});
					res.status(200).send({
						message: "Login Successful",
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
