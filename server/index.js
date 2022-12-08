const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const os = require("os");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const routesUrls = require("./routes/signup");
const routesUrls2 = require("./routes/signin");
const cookieparser = require("cookie-parser");
const { validateToken } = require("./jwt");

const app = express();
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, (data) => console.log("connected to database!!"));
app.use(cookieparser());

app.use(express.json()); // ?
app.use(
	cors({
		origin: "http://localhost:3000",
		// methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use("/user", routesUrls);
app.use("/user", routesUrls2);
app.get("/", (req, res) => {
	res.send("server is running");
});

app.get("/valid", validateToken, (req, res) => {
	res.send("valid!!");
});
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
	console.log("socket id: ", socket.id);
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`user: ${socket.id} join room: ${data}`);
	});
	socket.on("send_message", (msg) => {
		socket.to(msg.room).emit("receive_message", msg);
	});
	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});

	socket.emit("myID", socket.id);

	socket.on("calluser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("calluser", { signal: signalData, from, name });
	});

	socket.on("answercall", (data) => {
		io.to(data.to).emit("callaccepted", data.signal);
	});

	socket.on("leavecall", (data) => {
		console.log("good");
		io.to(data.to).emit("callended", socket.id);
	});
});

server.listen(3001, "0.0.0.0", () => {
	console.log("server is running");
});

app.listen(4000, () => {
	console.log("fucking good");
});
