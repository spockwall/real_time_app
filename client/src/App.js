import "./Css/App.css";
import "./Css/Chat.css";
import "./Css/VideoCall.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Chat from "./Pages/Chat";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./components/NavBar";
import VideoCall from "./Pages/VideoCall";

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
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
