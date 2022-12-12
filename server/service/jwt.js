const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
	const accessToken = sign(
		{
			// id: user._id,
			username: user.username,
			email: user.email,
		},
		process.env.TOKEN_SECRET
	);
	return accessToken;
};

const validateToken = (req, res, next) => {
	// const accessToken = req.cookies["accessToken"];
	const accessToken = localStorage.getItem("accessToken");
	if (!accessToken) {
		//check if token exist
		return res.status(400).json({ error: "not authed!!" });
	}
	try {
		//check if a valid token
		const validToken = verify(accessToken, process.env.TOKEN_SECRET);
		if (validToken) {
			req.authenticated = true;
			// pass catch error
			return next();
		}
	} catch (err) {
		return res.status(400).json({ error: err });
	}
};

module.exports = { createTokens, validateToken };
