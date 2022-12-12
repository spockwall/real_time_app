const express = require("express");
const router = express.Router();

router.post("/signout", async (req, res) => {
	// res.cookie("accessToken", "", {
	// 	sameSite: "none",
	// 	secure: true,
	// 	domain: "computer-network-phase2.onrender.com",
	// 	httpOnly: true,
	// 	expires: new Date(1),
	// });
	localStorage.removeItem("accessToken");
	res.status(200).json({ success: true, message: "User logged out successfully" });
});

module.exports = router;
