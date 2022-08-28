import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
	const [currency, setCurrency] = useState("aud");
	const [symbol, setSymbol] = useState("$");

	useEffect(() => {
		if (currency === "AUD") setSymbol("$");
		else if (currency === "IDR") setSymbol("Rp");
		else if (currency === "MYR") setSymbol("RM");
	}, [currency]);

	return (
		<Crypto.Provider value={{ currency, symbol, setCurrency }}>
			{children}
		</Crypto.Provider>
	);
};

export default CryptoContext;

export const CryptoState = () => {
	return useContext(Crypto);
};
