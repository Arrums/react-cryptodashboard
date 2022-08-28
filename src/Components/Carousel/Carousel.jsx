import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { CryptoState } from "../../Context/CryptoContext";
import { carouselCoins, numberWithCommas } from "../../Services/Server";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
	const { currency, symbol } = CryptoState();
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		const fetchCarouselCoins = async () => {
			const data = await axios.get(carouselCoins(currency));

			setTrending(data.data);
		};
		fetchCarouselCoins();
	}, [currency]);

	const Carousel = styled("div")(() => ({
		height: "55%",
		display: "flex",
		alignItems: "center",
	}));

	const DisplayCoins = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "column",
		color: theme.palette.background.default,
		cursor: "pointer",
	}));

	const items = trending.map((coin) => {
		let profit = coin.price_change_percentage_24h >= 0;
		return (
			<Link to={`coins/${coin.id}`}>
				<DisplayCoins>
					<img
						src={coin?.image}
						alt={coin?.name}
						height="80px"
						style={{ marginBottom: "15px" }}
					/>

					<span style={{ textTransform: "uppercase" }}>
						{coin?.symbol}
						&nbsp;
						<span
							style={{
								color: profit > 0 ? "#4cd819" : "red",
								fontWeight: 500,
							}}>
							{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
						</span>
					</span>

					<span style={{ fontSize: "22px", fontWeight: "500" }}>
						{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
					</span>
				</DisplayCoins>
			</Link>
		);
	});

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};
	return (
		<Carousel>
			<AliceCarousel
				infinite
				autoPlay
				autoPlayInterval={1500}
				disableButtonsControls
				animationDuration={2500}
				responsive={responsive}
				items={items}
			/>
		</Carousel>
	);
};

export default Carousel;
