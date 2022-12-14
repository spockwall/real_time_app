const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const routesUrls = require("./routes/signup");
const routesUrls2 = require("./routes/signin");
const routesUrls3 = require("./routes/signout");

const cookieparser = require("cookie-parser");
const { validateToken } = require("./service/jwt");

const app = express();
app.set("trust proxy", 1);
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, (data) => console.log("connected to database!!"));
app.use(cookieparser());
app.use(express.json()); // ?
// 所有的請求都會經過這個 middleware
const addSecurityHeaders = function (req, res, next) {
	res.header("X-Content-Type-Options", "nosniff");
	next();
};
app.use(addSecurityHeaders);
app.use(
	cors({
		origin: "https://computer-network-phase2.onrender.com",
		credentials: true,
	})
);
// login/logout/register
app.use("/user", routesUrls);
app.use("/user", routesUrls2);
app.use("/user", routesUrls3);
app.get("/", (req, res) => {
	res.send("server is running");
});

app.get("/valid", validateToken, (req, res) => {
	res.send("valid!!");
});

// io streaming
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "https://computer-network-phase2.onrender.com",
		methods: ["GET", "POST"],
	},
});
require("./service/io")(io);
const PORT = process.env.PORT || 3001;

server.listen(3001, () => {
	console.log("server is running");
});

app.listen(4000, () => {
	console.log("fucking good");
});
