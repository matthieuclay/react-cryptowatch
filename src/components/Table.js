import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableLine from "./TableLine";
import ToTop from "./ToTop";

const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");
  const showStable = useSelector((state) => state.stableReducer);
  const showList = useSelector((state) => state.listReducer);

  const tableHeader = [
    "Price",
    "MarketCap",
    "Volume",
    "1h",
    "1d",
    "1w",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  const excludeCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "mim" ||
      coin === "tusd" ||
      coin === "usdp" ||
      coin === "usdn" ||
      coin === "fei" ||
      coin === "tribe" ||
      coin === "gusd" ||
      coin === "frax" ||
      coin === "lusd" ||
      coin === "husd" ||
      coin === "ousd" ||
      coin === "xsgd" ||
      coin === "usdx" ||
      coin === "eurs"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + " reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + " reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .filter((coin) => {
            if (showList) {
              let list = window.localStorage.coinList.split(",");
              if (list.includes(coin.id)) {
                return coin;
              }
            } else {
              return coin;
            }
          })
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (excludeCoin(coin.symbol)) {
                return coin;
              }
            }
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "Price":
                return b.current_price - a.current_price;
              case "Volume":
                return b.total_volume - a.total_volume;
              case "MarketCap":
                return b.market_cap - a.market_cap;
              case "1h":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1d":
                return (
                  b.price_change_percentage_24h_in_currency -
                  a.price_change_percentage_24h_in_currency
                );
              case "1w":
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case "1m":
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case "6m":
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case "1y":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "ATH":
                return b.ath_change_percentage - a.ath_change_percentage;
              case "#reverse":
                return a.market_cap - b.market_cap;
              case "Price reverse":
                return a.current_price - b.current_price;
              case "Volume reverse":
                return a.total_volume - b.total_volume;
              case "MarketCap reverse":
                return a.market_cap - b.market_cap;
              case "1h reverse":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1d reverse":
                return (
                  a.price_change_percentage_24h_in_currency -
                  b.price_change_percentage_24h_in_currency
                );
              case "1w reverse":
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case "1m reverse":
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case "6m reverse":
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case "1y reverse":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case "ATH reverse":
                return a.ath_change_percentage - b.ath_change_percentage;
              default:
                return null;
            }
          })
          .map((coin, index) => (
            <TableLine coin={coin} index={index} key={index} />
          ))}
    </div>
  );
};

export default Table;
