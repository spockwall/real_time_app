import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/Stream";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";

export default function VideoCall() {
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);
	const [idToCall, setIdToCall] = useState("");
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

	useEffect(() => {
		console.log(auth);
		if (auth === false) {
			navigate("/signin", { replace: true });
		}
	}, [auth]);
	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div className="notification">
					<h2>{call.name} is calling</h2>
					<button
						variant="contained"
						onClick={() => {
							answerCall();
							setIdToCall(call.from);
						}}
					>
						Answer
					</button>
				</div>
			)}
			<div className="video-container">
				{callAccepted && !callEnded && (
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
						<button
							onClick={() => {
								leaveCall(idToCall);
								setIdToCall("");
							}}
						>
							Hang up
						</button>
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
