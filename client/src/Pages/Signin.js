import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const login = (e) => {
		e.preventDefault(); // very important
		const info = {
			username,
			password,
		};
		axios
			.post("http://localhost:4000/user/signin", info)
			.then((data) => {
				console.log(data);
				window.alert("sign in successfully");
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				window.alert("fail to sign in");
			});
	};
	return (
		<>
			<div className="signin-container signup-container">
				<form onSubmit={login}>
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
						<span>{"Password"}</span>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<button type="submit">sign in</button>
				</form>
				<a href="/signup">sign up</a>
			</div>
		</>
	);
}
