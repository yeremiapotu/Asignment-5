import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`https://api.currencyfreaks.com/latest?apikey=822bebb8bbfe47be8151c06c54cf3b8c&symbols=CAD,IDR,JPY,CHF,EUR,GBP`)
      .then((response) => response.json())
      .then((data) => setRates(data.rates));
  }, []);

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
