import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";
import axios from "axios";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const register = (e) => {
		e.preventDefault();
		const info = {
			username,
			email,
			password,
		};
		axios
			.post("https://computer-network-phase2.herokuapp.com/user/signup", info, { withCredentials: true })
			.then((data) => {
				setAuth(true);
				window.alert("sign up successfully");
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="signup-container">
				<form onSubmit={register}>
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
						<span>{"Email"}</span>
						<input
							type="email"
							onChange={(e) => {
								setEmail(e.target.value);
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
					<button type="submit">sign up</button>
				</form>
				<a href="/signin">sign in</a>
			</div>
		</>
	);
}
