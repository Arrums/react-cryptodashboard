import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { styled, ThemeProvider } from "@mui/material/styles";
import Header from "./Components/Header/Header";
import Home from "./Container/Home/Home";
import CoinPage from "./Container/CoinPage/CoinPage";
import { theme } from "./Context/Theme";

function App() {
	const ApplicationDiv = styled("div")(({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary,
		minHeight: "100vh",
	}));

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<ApplicationDiv>
					<Header />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/coins/:id" element={<CoinPage />} />
					</Routes>
				</ApplicationDiv>
			</ThemeProvider>
		</Router>
	);
}

export default App;
