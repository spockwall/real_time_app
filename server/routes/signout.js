const express = require("express");
const router = express.Router();

router.post("/signout", async (req, res) => {
	res.cookie("accessToken", "", {
		// expires: new Date(0),
		// secure: true,
		// httpOnly: true,
		httpOnly: true,
		// secure: true,
		// sameSite: "none",
		expires: new Date(1),
	});
	res.status(200).json({ success: true, message: "User logged out successfully" });
});

module.exports = router;
