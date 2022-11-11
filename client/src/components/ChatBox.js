import { useEffect, useState } from "react";
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default function ChatBox({ socket, username, userId, room }) {
	const [msgHistory, setMsgHistory] = useState([]);
	const [curMsg, setCurMsg] = useState("");
	const sendMsg = async () => {
		if (curMsg !== "") {
			const curMonth = new Date(Date.now()).getMonth();
			const curDate = new Date(Date.now()).getDate();
			const curHour = new Date(Date.now()).getHours();
			const curMinute = new Date(Date.now()).getMinutes();
			const message = {
				username,
				userId,
				id: uid(),
				room,
				content: curMsg,
				time: `${curMonth}/${curDate} ${curHour}:${curMinute}`,
			};
			await socket.emit("send_message", message);
			setMsgHistory((prev) => [...prev, message]);
			setCurMsg("");
		} else {
			console.log("Blank message is invalid to send");
		}
	};
	console.log(userId);

	useEffect(() => {
		const res = (data) => {
			setMsgHistory((prev) => [...prev, data]);
		};
		socket.on("receive_message", res);
		return () => socket.off("receive_message", res);
	}, [socket]);
	return (
		<div className="chatBox">
			<div className="room-title">
				<h1>Room: {room}</h1>
			</div>
			<div className="msg-window">
				{msgHistory.map((msg) => {
					const side = msg.userId === userId ? "me" : "other";
					return (
						<div key={msg.id}>
							<div className={"msg-username-" + side}>
								{msg.username}
							</div>
							<div className={"msg-content-" + side}>
								{msg.content}
							</div>
							<div className={"msg-time-" + side}>{msg.time}</div>
						</div>
					);
				})}
			</div>
			<div className="input-container">
				<input
					type="text"
					value={curMsg}
					placeholder="type your message..."
					onChange={(e) => {
						setCurMsg(e.target.value);
					}}
				/>
				<button onClick={sendMsg}>send</button>
			</div>
		</div>
	);
}
