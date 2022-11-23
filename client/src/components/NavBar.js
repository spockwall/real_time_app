import { Link } from "react-router-dom";

export default function NavBar() {
	const NavItem = (props) => {
		return (
			<div className="navitem">
				<Link to={props.url}>{props.children}</Link>
			</div>
		);
	};
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
	return (
		<nav className="navbar">
			<div className="navbar-item-container">
				{navList.map((item) => (
					<NavItem key={item.url} url={item.url}>
						{item.text}
					</NavItem>
				))}
			</div>
		</nav>
	);
}
