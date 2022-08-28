import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../Context/CryptoContext";
import { dataChart } from "../../Services/Server";
import { CircularProgress, styled } from "@mui/material";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../Services/ChartDays";
import SelectButton from "../SelectButton/SelectButton";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const CoinInfo = ({ coin }) => {
	//state for data
	const [chartData, setChartData] = useState();

	//state for days
	const [days, setDays] = useState(1);

	const { currency } = CryptoState();

	const InfoContainer = styled("div")(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "70%",
		marginTop: 25,
		padding: 20,

		[theme.breakpoints.down("lg")]: {
			width: "100%",
			marginTop: 0,
			padding: 20,
			paddingTop: 0,
		},
	}));

	const BtnWrapper = styled("div")(() => ({
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
		marginTop: 20,
	}));

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await axios.get(dataChart(coin.id, days, currency));
			setChartData(data.prices);
		};
		fetchChartData();
	}, [coin.id, currency, days]);

	return (
		<InfoContainer>
			{!chartData ? (
				<CircularProgress color="primary" />
			) : (
				<>
					<Line
						data={{
							labels: chartData.map((coin) => {
								const date = new Date(coin[0]);
								let hours = date.getHours() < 10 ? "0" : "" + date.getHours();
								hours = ("0" + hours).slice(-2);
								let minutes =
									date.getMinutes() < 10 ? "0" : "" + date.getMinutes();
								minutes = ("0" + minutes).slice(-2);
								let time = `${hours}:${minutes}`;
								return days === 1 ? time : date.toLocaleDateString();
							}),
							datasets: [
								{
									data: chartData.map((coin) => coin[1]),
									label: `Price (Past ${days} Days)`,
									borderColor: "#454545",
								},
							],
						}}
						options={{
							elements: {
								point: {
									radius: 1,
								},
							},
						}}
					/>
					<BtnWrapper>
						{chartDays.map((day) => (
							<SelectButton
								key={day.value}
								onClick={() => setDays(day.value)}
								selected={day.value === days}>
								{day.label}
							</SelectButton>
						))}
					</BtnWrapper>
				</>
			)}
		</InfoContainer>
	);
};

export default CoinInfo;
