import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Carousel from "../Carousel/Carousel";

const Banner = () => {
	const Banner = styled("div")(() => ({
		backgroundColor: "#d66d75",
		background: "linear-gradient(to left, #d66d75, #e29587)",
	}));

	const BannerContent = styled(Container)(() => ({
		height: "450px",
		display: "flex",
		flexDirection: "column",
		paddingTop: "1.5rem",
		justifyContent: "space-around",
	}));

	const TitleBanner = styled("div")(({ theme }) => ({
		display: "flex",
		height: "40%",
		flexDirection: "column",
		justifyContent: "center",
		textAlign: "center",
		color: theme.palette.background.default,
	}));
	return (
		<Banner>
			<BannerContent maxWidth={false}>
				<TitleBanner>
					<Typography
						variant="h2"
						sx={{
							fontWeight: 700,
							marginBottom: "0.7rem",
						}}>
						Crypto Dashboard
					</Typography>
					<Typography
						variant="subtitle1"
						sx={{
							textTransform: "capitalize",
						}}>
						Check the latest details of cryptocurrency
					</Typography>
				</TitleBanner>
				<Carousel />
			</BannerContent>
		</Banner>
	);
};

export default Banner;
