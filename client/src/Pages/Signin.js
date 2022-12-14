import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/Auth";
export default function Signin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);
	const login = (e) => {
		e.preventDefault(); // very important
		const info = {
			username,
			password,
		};
		axios
			.post("https://computer-network-phase2-server.onrender.com/user/signin", info, { withCredentials: true })
			.then((data) => {
				setAuth(true);
				window.alert("Sign in successfully!");
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err);
				window.alert("Fail to sign in!");
			});
	};
	return (
		<>
			<div className="signin-container">
				<form onSubmit={login}>
					<div className="sign-container">
						<span>{"Username"}</span>
						<input
							type="text"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							required
						/>
					</div>
					<div className="sign-container">
						<span>{"Password"}</span>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</div>
					<button type="submit">sign in</button>
				</form>
				<a href="/signup">sign up</a>
			</div>
		</>
	);
}
