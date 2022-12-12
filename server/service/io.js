module.exports = function (io) {
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
};
