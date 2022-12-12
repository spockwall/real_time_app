import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState();
	useEffect(() => {
		axios
			.get("https://computer-network-phase2.herokuapp.com/valid", {withCredentials: true})
			.then(() => {
				setAuth(true);
			})
			.catch((err) => {
				setAuth(false);
			});
	}, []);
	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
