import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";

export default function Home() {
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		console.log(auth);
		if (auth === false) {
			navigate("/signin", { replace: true });
		}
	}, [auth]);
	return (
		<>
			<div className="main-container">THIS IS THE HOME PAGE</div>
		</>
	);
}
