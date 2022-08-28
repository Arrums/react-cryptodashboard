//Fetching for single coin
export const singleCoin = (id) =>
	`https://api.coingecko.com/api/v3/coins/${id}`;

//Trending coins for carousel
export const carouselCoins = (currency) =>
	`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=15&page=1&sparkline=false&price_change_percentage=24h`;

//Regex for commas
export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//Coinlist for table
export const coinList = (currency) =>
	`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=1&sparkline=false`;

//data for the chart
export const dataChart = (id, days = 365, currency) =>
	`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
