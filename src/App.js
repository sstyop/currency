import React, { useState,useCallback } from "react";
import axios from "axios";

function App() {
	const [toCurrency, setToCurrency] = useState("USD");
	const [loading, setLoading] = useState(false);
	const [resultBlock, setResultBlock] = useState(false);
	const [ammount, setAmmount] = useState({
		inserted: null,
		rate: null,
	});

	const getRates = async (currency) => {
		setLoading(true);
		const res = await axios.get(
			`http://api.currencylayer.com/live?access_key=966c0fb01282d43ad86e9193933b61b8&currencies=${currency},MXN&format=1`
		);
		setLoading(false);

		setAmmount({ ...ammount, rate: Number(Object.values(res.data.quotes)[0]).toFixed(3) });
		setResultBlock(true);
	};

  const storeResult = useCallback(() => {
    return (
      <div className="result">
            <p>
              {ammount.inserted} USD ={" "}
              {ammount.rate * ammount.inserted} {toCurrency}
            </p>
            <p>1 USD = {ammount.rate} {toCurrency}</p>
          </div>
    )
  },[ammount.rate,ammount.inserted,toCurrency])

	return (
		<div className='App'>
			<div className={`currency-app ${loading ? 'loading' :''}`}>
        {loading && <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt='loading'/>}
				<h1 className='title'>From USD to {toCurrency}</h1>
				<input
					onChange={(e) => {
						setAmmount({ ...ammount, inserted: e.target.value });
						setResultBlock(false);
					}}
					type='number'
					placeholder='Please write an ammount'
				/>
				<select
					className='to-currency'
					onChange={(e) => {
						setToCurrency(e.target.value);
						setResultBlock(false);
					}}>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
					<option value='ILS'>ILS</option>
				</select>
				<button onClick={() => getRates(toCurrency)} disabled={ammount.inserted === null && true}>Calculate</button>
				{resultBlock && storeResult()}
			</div>
		</div>
	);
}

export default App;
