import React, { useEffect, useState } from "react";
import { CryptoState } from "../../Context/CryptoContext";
import { coinList, numberWithCommas } from "../../Services/Server";
import axios from "axios";
import {
	Typography,
	Container,
	TextField,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	CircularProgress,
	Paper,
	styled,
	TableCell,
	tableCellClasses,
	TableBody,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";

const CryptoTable = () => {
	const [coins, setCoins] = useState([]);

	//Loading state
	const [loading, setLoading] = useState(false);

	//Search state
	const [search, setSearch] = useState("");

	//Page state
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	//Currency context
	const { currency, symbol } = CryptoState();

	//router handler
	const navigate = useNavigate();

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	//will return everything if there's nothing on the search bar
	const handleSearch = () => {
		return coins.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
			);
		});
	};

	//handling pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		window.scroll(0, 450);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	//styling table header
	const EditedHeaderCells = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.background.paper,
			fontWeight: 600,
		},
	}));

	const EditedRows = styled(TableRow)(() => ({
		cursor: "pointer",
		".MuiTableRow-hover": {
			backgroundColor: "#131111",
		},
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));

	useEffect(() => {
		const fetchCoins = async () => {
			setLoading(true);
			const data = await axios.get(coinList(currency));

			setCoins(data.data);
			setLoading(false);
		};
		fetchCoins();
	}, [currency]);

	return (
		<>
			<Container sx={{ textAlign: "center" }}>
				<Typography variant="h4" sx={{ margin: "1.7rem 0", color: "#454545" }}>
					Cryptocurrency Prices (Based on Market Cap)
				</Typography>

				<TextField
					fullWidth
					variant="outlined"
					label="Search A Cryptocurrency"
					sx={{ marginBottom: "1rem" }}
					onChange={handleSearchChange}
				/>
				<TableContainer component={Paper}>
					{loading ? (
						<CircularProgress color="primary" />
					) : (
						<Table
							sx={{ minWidth: 300 }}
							aria-label="crypto-marketcap-table"
							stickyHeader>
							<TableHead>
								<TableRow>
									{["Coin Name", "Price", "24h Change", "Market Cap"].map(
										(head) => (
											<EditedHeaderCells
												key={head}
												align={head === "Coin Name" ? "left" : "center"}>
												{head}
											</EditedHeaderCells>
										),
									)}
								</TableRow>
							</TableHead>

							<TableBody>
								{handleSearch()
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										let profit = row.price_change_percentage_24h > 0;

										return (
											<EditedRows
												onClick={() => navigate(`/coins/${row.id}`)}
												key={row.name}
												hover={true}>
												<TableCell
													component="th"
													scope="row"
													sx={{
														display: "flex",
														gap: 5,
													}}>
													<img
														src={row?.image}
														alt={row.id}
														height="50px"
														style={{ marginBottom: 10 }}
													/>
													<div
														style={{
															display: "flex",
															flexDirection: "column",
															justifyContent: "center",
														}}>
														<span
															style={{
																textTransform: "uppercase",
																fontSize: 25,
															}}>
															{row.symbol}
														</span>
														<span style={{ color: "#454545" }}>{row.name}</span>
													</div>
												</TableCell>
												<TableCell align="center">
													{symbol}
													{numberWithCommas(row.current_price.toFixed(2))}
												</TableCell>
												<TableCell
													align="center"
													sx={{
														color: profit > 0 ? "#4cd819" : "red",
														fontWeight: 500,
													}}>
													{profit && "+"}
													{row.price_change_percentage_24h.toFixed(2)}%
												</TableCell>
												<TableCell align="center">
													{symbol}{" "}
													{numberWithCommas(
														row.market_cap.toString().slice(0, -6),
													)}
												</TableCell>
											</EditedRows>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={handleSearch()?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Container>
		</>
	);
};

export default CryptoTable;
