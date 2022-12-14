const express = require("express");
const router = express.Router();

router.post("/signout", async (req, res) => {
	res.cookie("computernetworkphase2Token", "", {
		sameSite: "none",
		secure: true,
		domain: "computer-network-phase2-server.onrender.com",
		httpOnly: true,
		expires: new Date(1),
		path: "/",
	});
	res.status(200).json({ success: true, message: "User logged out successfully" });
});

module.exports = router;
