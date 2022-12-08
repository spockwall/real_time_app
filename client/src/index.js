import React from "react";
import ReactDOM from "react-dom/client";
import { StreamContextProvider } from "./context/Stream";
import App from "./App";
import {AuthProvider} from './context/Auth';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<StreamContextProvider>
				<App />
			</StreamContextProvider>
		</AuthProvider>
	</React.StrictMode>
);
