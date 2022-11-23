import { useState, useContext } from "react";
import { SocketContext } from "../context/Stream";

export default function VideoCall() {
	const {
		myID,
		myVideo,
		userVideo,
		callAccepted,
		callEnded,
		name,
		setName,
		call,
		answerCall,
		callUser,
		leaveCall,
		stream,
	} = useContext(SocketContext);

	const [idToCall, setIdToCall] = useState("");
	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div>
					<h2>{call.name} is calling</h2>
					<button variant="contained" onClick={answerCall}>
						Answer
					</button>
				</div>
			)}
			<div className="video-container">
				{stream && (
					<video playsInline muted ref={myVideo} autoPlay className="video"></video>
				)}
			</div>
			<div className="video-container">
				{callAccepted && !callEnded && (
					<video playsInline ref={userVideo} autoPlay className="video"></video>
				)}
			</div>
			<div className="info-container">
				<div className="inputField">
					<h4>Your ID</h4>
					<div>{myID}</div>
				</div>
				<div className="inputField">
					<h4>Type your name</h4>
					<input
						value={name}
						placeholder="type name..."
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div className="inputField">
					<h4>Type Id to call</h4>
					<input
						value={idToCall}
						placeholder="type ID to call..."
						onChange={(e) => {
							setIdToCall(e.target.value);
						}}
						disabled={callAccepted && !callEnded}
					></input>
					{callAccepted && !callEnded ? (
						<button onClick={leaveCall}>Hang up</button>
					) : (
						<button
							onClick={() => {
								callUser(idToCall);
							}}
						>
							make a call
						</button>
					)}
				</div>
			</div>
		</>
	);
}
