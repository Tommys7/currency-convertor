import { useEffect, useState } from "react";

import SwapIcon from "../../icons/currency-swap.png";

export function Convertor() {
  const [input, setInput] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("CZK");
  const [output, setOutput] = useState("10");
  const [data, setData] = useState(null);

  const currencies = [
    { currency: "USD", currImg: "🇺🇸" },
    { currency: "EUR", currImg: "🇪🇺" },
    { currency: "PLN", currImg: "🇵🇱" },
    { currency: "GBP", currImg: "🇬🇧" },
    { currency: "CZK", currImg: "🇨🇿" },
  ];

  const currencyOptionsFrom = currencies;
  const currencyOptionsTo = currencies;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function fetchCurrency() {
        try {
          if (input > 0) {
            const res = await fetch(
              `https://api.frankfurter.app/latest?amount=${input}&from=${currencyFrom}&to=${currencyTo}`
            );
            const data = await res.json();
            setData(data);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }

      fetchCurrency();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [input, currencyTo, currencyFrom]);

  useEffect(() => {
    if (data) {
      setOutput(data.rates[currencyTo]);
    }
  }, [data, currencyTo, currencyFrom]);

  const handleSwapCurrenciesChange = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  return (
    <div className="container">
      <div className="convertor-box">
        <div className="convertor-wrap">
          <span className="small-text">Amount</span>
          <div className="convert-converted">
            <input
              type="number"
              value={input}
              placeholder="0.1"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="output-input"
            />
            <select
              className="convertor-select"
              value={currencyFrom}
              onChange={(e) => {
                setCurrencyFrom(e.target.value);
              }}
            >
              {currencyOptionsFrom.map((currency) => (
                <option
                  key={currency.currency}
                  value={currency.currency}
                  disabled={currency.currency === currencyTo}
                  className="currency-option"
                >
                  {currency.currImg} {currency.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="convertor-swap">
          <button
            onClick={handleSwapCurrenciesChange}
            className="convertor-swap-btn"
          >
            <img className="convertor-swap-img" src={SwapIcon} alt="" />
          </button>
          <div className="convertor-swap-linethrough"></div>
        </div>
        <div className="convertor-wrap">
          <span className="small-text">Converted amount</span>
          <div className="convert-converted">
            <p className="output-input">{input <= 0 ? 0 : output}</p>
            <select
              className="convertor-select"
              value={currencyTo}
              onChange={(e) => {
                setCurrencyTo(e.target.value);
              }}
            >
              {currencyOptionsTo.map((currency) => (
                <option
                  key={currency.currency}
                  value={currency.currency}
                  disabled={currency.currency === currencyFrom}
                >
                  {currency.currImg} {currency.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {input == 0 && (
        <span className="error-text">Min value to convert is 0.1</span>
      )}
    </div>
  );
}


