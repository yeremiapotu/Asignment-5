import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rates, setRates] = useState({});

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_CRNCY = process.env.REACT_APP_CURRENCY;

  useEffect(() => {
    const url = `${API_URL}apikey=${API_KEY}&symbols=${API_CRNCY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [API_URL, API_KEY, API_CRNCY]);

  return (
    <div className="container text-center mt-5">
      <h1>Currency Rates</h1>
      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates).map((currency) => {
            const exchangeRate = rates[currency];
            const weBuy = exchangeRate * 1.05;
            const weSell = exchangeRate * 0.95;

            return (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{weBuy.toFixed(4)}</td>
                <td>{exchangeRate}</td>
                <td>{weSell.toFixed(4)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
