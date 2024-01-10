import { useEffect, useState } from "react";

export function Convertor() {
  const [input, setInput] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [output, setOutput] = useState("10");
  const [data, setData] = useState(null);
  const currencies = ["USD", "EUR", "CAD", "INR", "CZK"];

  const currencyOptionsFrom = currencies.filter(
    (currency) => currency !== currencyTo
  );
  const currencyOptionsTo = currencies.filter(
    (currency) => currency !== currencyFrom
  );

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currencyFrom}&to=${currencyTo}`
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchCurrency();
  }, [input, currencyTo, currencyFrom]);

  useEffect(() => {
    if (data) {
      setOutput(data.rates[currencyTo] + " " + currencyTo);
    }
  }, [data, currencyTo, currencyFrom]);

  return (
    <div className="convertor-box">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="convertor-input"
      />
      <select
        className="convertor-select"
        value={currencyFrom}
        onChange={(e) => {
          setCurrencyFrom(e.target.value);
        }}
      >
        {currencyOptionsFrom.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        className="convertor-select"
        value={currencyTo}
        onChange={(e) => {
          setCurrencyTo(e.target.value);
        }}
      >
        {currencyOptionsTo.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <p className="convertor-output">{output}</p>
    </div>
  );
}

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
