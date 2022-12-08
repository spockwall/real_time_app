import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState();
	useEffect(() => {
		axios
			.get("http://localhost:4000/valid", {withCredentials: true})
			.then(() => {
				console.log("good");
				setAuth(true);
			})
			.catch((err) => {
				console.log("bad");
				setAuth(false);
			});
	}, []);
	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
