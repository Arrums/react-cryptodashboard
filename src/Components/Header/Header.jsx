import { styled } from "@mui/material/styles";
import {
	AppBar,
	MenuItem,
	Select,
	Toolbar,
	FormControl,
	InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CryptoState } from "../../Context/CryptoContext";
import { ThemeProvider } from "@mui/system";
import { darkTheme } from "../../Context/Theme";

const Header = () => {
	const LogoCrypto = styled("div")(({ theme }) => ({
		flex: 1,
		fontFamily: "Roboto",
		fontSize: "1.5rem",
		fontWeight: "500",
		color: theme.palette.background.default,
		cursor: "pointer",
	}));

	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};

	const { currency, setCurrency } = CryptoState();
	const handleChange = (e) => {
		setCurrency(e.target.value);
	};

	return (
		<AppBar color="primary" position="static">
			<Toolbar>
				<LogoCrypto onClick={handleClick}>Crypto Dashboard</LogoCrypto>
				<ThemeProvider theme={darkTheme}>
					<FormControl sx={{ m: 1, minWidth: 150 }}>
						<InputLabel id="select-currency">Currency</InputLabel>
						<Select
							variant="outlined"
							labelId="select-currency"
							label="Currency"
							value={currency}
							onChange={handleChange}
							sx={{
								height: 40,
							}}>
							<MenuItem value={"aud"}>AUD</MenuItem>
							<MenuItem value={"idr"}>IDR</MenuItem>
							<MenuItem value={"myr"}>MYR</MenuItem>
						</Select>
					</FormControl>
				</ThemeProvider>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
