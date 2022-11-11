import "./Css/App.css";
import "./Css/Chat.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Chat from "./Pages/Chat";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./components/NavBar";

function App() {
	return (
		<>
			<Router>
				<NavBar></NavBar>
				<div id="body">
					<Routes>
						{/* <Route path="/" element={<Chat />} /> */}
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
