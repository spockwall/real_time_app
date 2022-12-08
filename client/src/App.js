import "./Css/App.css";
import "./Css/Chat.css";
import "./Css/VideoCall.css";
import "./Css/signup.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Chat from "./Pages/Chat";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./components/NavBar";
import VideoCall from "./Pages/VideoCall";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
	return (
		<>
			<Router>
				<NavBar></NavBar>
				<div id="body">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/videocall" element={<VideoCall />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
