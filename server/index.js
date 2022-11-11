const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
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
});

server.listen(3001, () => {
	console.log("server is running");
});
