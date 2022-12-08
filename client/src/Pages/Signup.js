import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const register = (e) => {
		e.preventDefault();
		const info = {
			username,
			email,
			password,
		};
		axios
			.post("http://localhost:4000/user/signup", info)
			.then((data) => {
				console.log(data);
				window.alert("sign up successfully")
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="signup-container">
				<form onSubmit={register}>
					<div className="input-container">
						<span>{"Username"}</span>
						<input
							type="text"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div className="input-container">
						<span>{"Email"}</span>
						<input
							type="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div className="input-container">
						<span>{"Password"}</span>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<button type="submit">sign up</button>
				</form>
				<a href='/signin'>sign in</a>
			</div>
		</>
	);
}
