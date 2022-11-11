// import io from "socket.io-client";
import { useState } from "react";
export default function Home() {
    // const socket = io.connect("http://localhost:3001");
	const [message, setMessage] = useState("");
	return (
		<>
			<div className="input-container">
				<input
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						// send(message);
					}}
				>
					click me
				</button>
			</div>
		</>
	);
}
