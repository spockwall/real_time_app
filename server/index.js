const express = require("express");
const http = require("http");
const app = express();
const os = require("os");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const PORT = process.env.PORT || 3001;

app.set(cors());
app.get("/", (req, res) => {
	res.send("server is running");
});
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
