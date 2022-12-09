import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";

function About() {
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		if (auth === false) {
			navigate("/signin", { replace: true });
		}
	}, [auth]);
	return <div className="main-container">THIS IS THE ABOUT PAGE</div>;
}

export default About;
