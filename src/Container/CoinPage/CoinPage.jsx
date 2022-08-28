import { CircularProgress, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../../Components/CoinInfo";
import { CryptoState } from "../../Context/CryptoContext";
import { numberWithCommas, singleCoin } from "../../Services/Server";
import parse from "html-react-parser";

const CoinPage = () => {
	//taking the id from params
	const { id } = useParams();
	const [coin, setCoin] = useState();

	const { currency, symbol } = CryptoState();

	//styling container
	const PageContainer = styled("div")(({ theme }) => ({
		display: "flex",
		[theme.breakpoints.down("lg")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	}));

	//styling sidebar
	const SideBar = styled("div")(({ theme }) => ({
		width: "30%",
		[theme.breakpoints.down("lg")]: {
			width: "100%",
			borderRight: "none",
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		borderRight: "2px solid grey",
	}));

	//styling heading
	const Heading = styled(Typography)(() => ({
		fontWeight: 900,
		marginBottom: 20,
		display: "flex",
	}));

	//styling description
	const FontDescription = styled(Typography)(({ theme }) => ({
		width: "100%",
		padding: 25,
		paddingBottom: 15,
		paddingTop: 0,
		[theme.breakpoints.down("lg")]: {
			textAlign: "center",
		},
	}));

	const MarketData = styled("div")(({ theme }) => ({
		alignSelf: "start",
		padding: 25,
		paddingTop: 10,
		width: "100%",

		[theme.breakpoints.down("lg")]: {
			display: "flex",
			justifyContent: "space-around",
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			alignItems: "center",
		},
		[theme.breakpoints.down("xs")]: {
			alignItems: "start",
		},
	}));

	useEffect(() => {
		const fetchSingleCoin = async () => {
			const { data } = await axios.get(singleCoin(id));

			setCoin(data);
		};
		fetchSingleCoin();
	}, [id]);

	const htmlCoinDesc = coin?.description.en.split(". ")[0];

	if (!coin) return <CircularProgress color="primary" />;

	return (
		<PageContainer>
			<SideBar>
				<img
					src={coin?.image.large}
					alt={coin?.name}
					height="200"
					style={{ marginBottom: 20 }}
				/>
				<Heading variant="h3">{coin?.name}</Heading>
				<FontDescription variant="subtitle1">
					{parse(`${htmlCoinDesc}`)}
				</FontDescription>
				<MarketData>
					<Heading variant="h5">Rank: {coin?.market_cap_rank}</Heading>
					<Heading variant="h5">
						Current Price: {symbol}
						{numberWithCommas(
							coin?.market_data.current_price[currency.toLowerCase()],
						)}
					</Heading>
				</MarketData>
			</SideBar>
			{/* chart */}
			<CoinInfo coin={coin} />
		</PageContainer>
	);
};

export default CoinPage;
