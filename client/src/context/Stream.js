// reference: https://github.com/adrianhajdin/project_video_chat/blob/master/client/src/Context.js
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { createContext, useState, useRef, useEffect } from "react";

const SocketContext = createContext();
const socket = io("https://computer-network-phase2-server.onrender.com", {
	transports: ["websocket"],
});

const StreamContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [myID, setMyID] = useState("");

	const myVideo = useRef(null);
	const userVideo = useRef(null);
	const connectionRef = useRef(null);

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
			myVideo.current.srcObject = currentStream;
		});

		socket.on("myID", (id) => setMyID(id));

		socket.on("calluser", ({ from, name, signal }) => {
			setCall({ isReceivingCall: true, from, name, signal });
		});
		socket.on("callaccepted", (signal) => {
			setCallAccepted(true);
		});
		socket.on("callended", () => {
			setCallEnded(true);
			connectionRef.current.destroy();
			window.location.reload();
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on("signal", (data) => {
			socket.emit("answercall", { signal: data, to: call.from });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
		peer.on("signal", (data) => {
			socket.emit("calluser", { userToCall: id, signalData: data, from: myID, name });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on("callaccepted", (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});
		connectionRef.current = peer;
	};

	const leaveCall = (id) => {
		setCallEnded(true);
		socket.emit("leavecall", { to: id });
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				myID,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { StreamContextProvider, SocketContext };
