import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth";
import { createBrowserHistory } from "history";
import axios from "axios";

export default function NavBar() {
	const history = createBrowserHistory();
	const navigate = useNavigate();
	const NavItem = (props) => {
		return (
			<div className="navitem">
				<Link
					to={props.url}
					onClick={() => {
						history.push(props.url, { from: history.location });
					}}
				>
					{props.children}{" "}
				</Link>
			</div>
		);
	};
	const { auth, setAuth } = useContext(AuthContext);
	let navList = [
		{
			text: "Home",
			url: "/",
		},
		{
			text: "About",
			url: "/about",
		},
		{
			text: "Chat",
			url: "/chat",
		},
		{
			text: "Video Call",
			url: "/videocall",
		},
	];
	const logout = (e) => {
		e.preventDefault(); // very important
		axios
			// .post("http://localhost:4000/user/signout", {}, { withCredentials: true })
			.post("https://computer-network-phase2-server.onrender.com/user/signout", {}, { withCredentials: true })
			.then((data) => {
				setAuth(false);
				window.alert("sign out successfully");
				navigate("/signin", { replace: true });
			})
			.catch((err) => {
				window.alert("fail to sign in");
			});
	};
	return auth ? (
		<nav className="navbar">
			<div className="navbar-item-container">
				{navList.map((item) => (
					<NavItem key={item.url} url={item.url}>
						{item.text}
					</NavItem>
				))}
				<button className="logout" onClick={logout}>
					logout
				</button>
			</div>
		</nav>
	) : (
		<div className="welcome-container">
			<div className="welcome">A good website</div>
		</div>
	);
}
