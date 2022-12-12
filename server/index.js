const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const server = require("./io");
const cors = require("cors");
const mongoose = require("mongoose");
const routesUrls = require("./routes/signup");
const routesUrls2 = require("./routes/signin");
const routesUrls3 = require("./routes/signout");

const cookieparser = require("cookie-parser");
const { validateToken } = require("./service/jwt");

const app = express();
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, (data) => console.log("connected to database!!"));
app.use(cookieparser());
app.use(express.json()); // ?
app.use(
	cors({
		// origin: "http://localhost:3000",
		origin: "https://computer-network-phase2.herokuapp.com",
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
		origin: "*",
		methods: ["GET", "POST"],
	},
});
require("./service/io")(io);
const PORT = process.env.PORT || 3001;

server.listen(3001, "0.0.0.0", () => {
	console.log("server is running");
});

app.listen(4000, () => {
	console.log("fucking good");
});
