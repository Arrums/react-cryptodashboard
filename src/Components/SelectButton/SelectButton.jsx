import { Button, styled } from "@mui/material";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
	const DaysBtn = styled(Button)(({ theme }) => ({
		border: "1px solid grey",
		borderRadius: 5,
		padding: 7,
		cursor: "pointer",
		background: selected ? theme.palette.primary.main : "",
		color: selected ? "white" : "",
		fontWeight: selected ? 700 : 500,
		width: "22%",

		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "white",
		},

		[theme.breakpoints.down("sm")]: {
			fontSize: "12px",
		},
	}));
	return <DaysBtn onClick={onClick}>{children}</DaysBtn>;
};

export default SelectButton;
