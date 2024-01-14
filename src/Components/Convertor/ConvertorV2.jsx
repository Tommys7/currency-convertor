import { useEffect, useState } from "react";

export function Convertor() {
  const [input, setInput] = useState(1);
  console.log(input)
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [output, setOutput] = useState("10");
  const [data, setData] = useState(null);
  const currencies = ["USD", "EUR", "CAD", "INR", "CZK"];

  const currencyOptionsFrom = currencies;
  const currencyOptionsTo = currencies;
  useEffect(() => {
    async function fetchCurrency() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${!input || input < 0.1 ? 0.1 : input}&from=${currencyFrom}&to=${currencyTo}`
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

  const handleSwapCurrenciesChange = () => {
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
  }

  return (
    <div className="convertor-box">
      <input
        type="number"
        value={input}
        placeholder="1"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="convertor-input"
      />
      {input == 0 && <span className="error-message">Min value to convert is 0.1</span>}
      <select
        className="convertor-select"
        value={currencyFrom}
        onChange={(e) => {
          setCurrencyFrom(e.target.value);
        }}
      >
        {currencyOptionsFrom.map((currency) => (
          <option
            key={currency}
            value={currency}
            disabled={currency === currencyTo}
          >
            {" "}
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
          <option
            key={currency}
            value={currency}
            disabled={currency === currencyFrom}
          >
            {currency}
          </option>
        ))}
      </select>
      <button onClick={handleSwapCurrenciesChange} className="convertor-output">SWAP CURRENCIES</button>
      <p className="convertor-output">{output}</p>
    </div>
  );
}

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
