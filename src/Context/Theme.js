import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#454545",
		},
		secondary: {
			main: "#f50057",
		},
		background: {
			default: "#fdf6e3",
			paper: "#ffffff",
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
