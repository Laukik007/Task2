import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import DetailViewPage from "./components/DetailViewPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/details/:id" element={<DetailViewPage />} />
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
