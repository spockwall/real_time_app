import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth";

export default function NavBar() {
	const NavItem = (props) => {
		return (
			<div className="navitem">
				<Link to={props.url}>{props.children}</Link>
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
	return auth ? (
		<nav className="navbar">
			<div className="navbar-item-container">
				{navList.map((item) => (
					<NavItem key={item.url} url={item.url}>
						{item.text}
					</NavItem>
				))}
			</div>
		</nav>
	) : (
		<div className="welcome-container">
			<div className="welcome">A good website</div>
		</div>
	);
}
