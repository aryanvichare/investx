import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';


const TOP_STOCKS = ['AAPL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'GOOGL', 'GOOG', 'BRK.B', 'JNJ', 'JPM']
const API = `https://www.alphavantage.co`;
const API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
const stockContext = createContext();


const queryStock = (symbol, onData) => {
  return axios.get(`${API}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
  .then(resp => {
    if (resp.data) {
      onData(resp['data']['Global Quote']);
    }
  });
};


export function StockProvider({ children }) {
  const stock = useProvideStock();
  return <stockContext.Provider value={stock}>{children}</stockContext.Provider>;
}

export const useStock = () => {
  return useContext(stockContext);
};

function useProvideStock() {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    for (const stock of TOP_STOCKS) {
      queryStock(stock, (data) => setStockList([...stockList, data]));
    }
  }, []);

  return stockList;
}