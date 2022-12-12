import { useState,  useContext, useEffect  } from "react";
import { io } from "socket.io-client";
import ChatBox from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";


const socket = io.connect("https://computer-network-phase2-server.onrender.com:3001");

const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default function Chat() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChatBox, setShowChatBox] = useState(false);
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);
	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChatBox(true);
		} else alert("please fill up the blank!");
	};
	useEffect(() => {
		if (auth === false) {
			navigate("/signin", { replace: true });
		}
	}, [auth]);
	return !showChatBox ? (
		<div className="join_room-container">
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
