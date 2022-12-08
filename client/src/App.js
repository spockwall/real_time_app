import "./Css/App.css";
import "./Css/Chat.css";
import "./Css/VideoCall.css";
import "./Css/signup.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Chat from "./Pages/Chat";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./components/NavBar";
import VideoCall from "./Pages/VideoCall";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import AuthContext from "./context/Auth";

function App() {
	const { auth } = useContext(AuthContext);
	const PrivateRoute = ({ auth, children, to }) => {
		return auth ? children : <Navigate to={to?? "/signin"} />;
	};
	return (
		<>
			<Router>
				<NavBar />
				<div id="body">
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute auth={auth}>
									<Home />
								</PrivateRoute>
							}
						/>

						<Route
							path="/about"
							element={
								<PrivateRoute auth={auth}>
									<About />
								</PrivateRoute>
							}
						/>
						<Route
							path="/chat"
							element={
								<PrivateRoute auth={auth}>
									<Chat />
								</PrivateRoute>
							}
						/>
						<Route
							path="/videocall"
							element={
								<PrivateRoute auth={auth}>
									<VideoCall />
								</PrivateRoute>
							}
						/>
						<Route
							path="/signup"
							element={
								<PrivateRoute auth={!auth}>
									<Signup />
								</PrivateRoute>
							}
						/>
						<Route
							path="/signin"
							element={
								<PrivateRoute auth={!auth} to="/">
									<Signin />
								</PrivateRoute>
							}
						/>
						<Route path="*" element={<ErrorPage />} to="/"/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
