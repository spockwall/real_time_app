import React from "react";
import ReactDOM from "react-dom/client";
import { StreamContextProvider } from "./context/Stream";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StreamContextProvider>
			<App />
		</StreamContextProvider>
	</React.StrictMode>
);
