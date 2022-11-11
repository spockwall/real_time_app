import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBox from "../components/ChatBox";

const socket = io.connect("http://localhost:3001");

const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default function Chat() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChatBox, setShowChatBox] = useState(false);
	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChatBox(true);
		} else alert("please fill up the blank!");
	};
	return !showChatBox ? (
		<div className='join_room-container'>
            <div className="join_room-title">
                <h2>Join Room</h2>
            </div>
			<input
				type="text"
				placeholder="username"
				onChange={(e) => {
					setUsername(e.target.value);
				}}
			/>
			<input
				type="text"
				placeholder="room"
				onChange={(e) => {
					setRoom(e.target.value);
				}}
			/>
			<button onClick={joinRoom}>click to join</button>
		</div>
	) : (
		<ChatBox socket={socket} username={username} userId={uid()} room={room} />
	);
}
