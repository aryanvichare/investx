import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Score from '@/components/Score';
import axios from 'axios';
import NewsCard from '@/components/NewsCard';
import StockCard from '@/components/StockCard';
import StockChart from '@/components/StockChart';
import { useAuth } from '@/lib/auth';
import { fromUnixTime, formatISO9075 } from 'date-fns';
import sp500 from '../utils/sp500.json';

const STUB_CHART = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const scoreData = [
  { scoreCount: 97, scoreName: 'Environmental Impact' },
  { scoreCount: 93, scoreName: 'Environmental Impact' },
  { scoreCount: 50, scoreName: 'Environmental Impact' },
  { scoreCount: 88, scoreName: 'Environmental Impact' },
  { scoreCount: 60, scoreName: 'Environmental Impact' },
  { scoreCount: 93, scoreName: 'Environmental Impact' },
  { scoreCount: 96, scoreName: 'Environmental Impact' },
  { scoreCount: 92, scoreName: 'Environmental Impact' }
];

const lookup = {};

const stockDataSeeded = sp500.map(({ symbol, name, price, change }) => {
  lookup[symbol] = name;
  return {
    score: 97,
    abbr: symbol,
    name,
    price: `$${price}`,
    df:
      change[0] === '-' || Math.round(parseFloat(change) * 100) === 0
        ? change
        : `+${change}`
  };
});

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState('GOOG');
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [chartData, setChartData] = useState(STUB_CHART);
  const [stockData, setStockData] = useState(stockDataSeeded);
  const [yRange, setYRange] = useState(null);
  const auth = useAuth();
  const stockSearcherRef = useRef();

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get('/api/news', {
        params: { query: `${lookup[selectedStock]}-Social` }
      });
      setArticles(response.data);
      console.log(response.data);
    };

    fetchNews();
  }, [selectedStock]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/chart/${selectedStock}`);
      let min = data[selectedStock][0].lowPrice;
      let max = data[selectedStock][0].highPrice;
      setChartData(
        data[selectedStock].map(
          ({ startEpochTime, openPrice, highPrice, lowPrice, closePrice }) => {
            const low = Math.round(lowPrice * 100) / 100;
            const high = Math.round(highPrice * 100) / 100;

            min = Math.min(min, low);
            max = Math.max(max, high);
            return {
              date: formatISO9075(fromUnixTime(startEpochTime), {
                representation: 'date'
              }),
              low,
              high,
              close: closePrice,
              open: openPrice
            };
          }
        )
      );
      setYRange([min, max]);
    })();
  }, [selectedStock]);

  const filterList = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase();

    const filteredData = stockDataSeeded.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.abbr.toLowerCase().includes(query)
    );
    setStockData(filteredData);
  };

  const onSelectCard = (e) => {
    let element = e.target;

    while (!element.getAttribute('data-abbr') && element.parentElement) {
      element = element.parentElement;
    }

    setSelectedStock(element.getAttribute('data-abbr') ?? selectedStock);
    return false;
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="flex flex-row relative flex-no-wrap">
        <div className="hidden lg:block lg:flex-shrink-0 bg-blue-600 w-48 lg:w-64">
          <div className="px-4 py-16">
            <div className="flex flex-row justify-start items-center lg:pl-4">
              <Image src="/images/logo.png" alt="me" width="50" height="50" />
              <h1 className="lg:ml-2 text-white font-bold text-3xl">
                Invest<span className="text-green-400">X</span>
              </h1>
            </div>
          </div>
          <div className="mt-6">
            <ul className="w-full">
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4">
                Stocks
              </li>
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4">
                Trends
              </li>
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4">
                Preference
              </li>
              <li
                onClick={() => auth.signOut()}
                className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="block lg:hidden lg:flex-shrink-0 bg-blue-600 w-24">
          <div className="px-4 py-16">
            <div className="flex flex-row justify-center items-center ">
              <Image src="/images/logo.png" alt="me" width="50" height="50" />
            </div>
          </div>
          <div className="mt-6">
            <ul className="w-full">
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
                <svg
                  className="w-8 h-8 text-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </li>
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
                <svg
                  className="w-8 h-8 text-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </li>
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
                <svg
                  className="w-8 h-8 text-center"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856ZM20.4933 4.89833C21.3244 4.89833 22 5.56203 22 6.37856C22 7.19618 21.3244 7.85989 20.4933 7.85989H13.9178C13.0856 7.85989 12.4101 7.19618 12.4101 6.37856C12.4101 5.56203 13.0856 4.89833 13.9178 4.89833H20.4933ZM3.50777 15.958H10.0833C10.9155 15.958 11.5911 16.6217 11.5911 17.4393C11.5911 18.2558 10.9155 18.9206 10.0833 18.9206H3.50777C2.67555 18.9206 2 18.2558 2 17.4393C2 16.6217 2.67555 15.958 3.50777 15.958ZM18.5611 20.7778C20.4611 20.7778 22 19.2648 22 17.3992C22 15.5325 20.4611 14.0196 18.5611 14.0196C16.6623 14.0196 15.1223 15.5325 15.1223 17.3992C15.1223 19.2648 16.6623 20.7778 18.5611 20.7778Z"
                    fill="white"
                  />
                </svg>
              </li>
              <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
                <svg
                  className="w-8 h-8 text-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        {!auth.user ? (
          <div className="h-screen">
            <svg
              class="animate-spin h-8 w-8 m-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="flex-1 overflow-x-scroll py-12">
            <div className="max-w-screen-xl mx-auto px-4 pt-24">
              <div className="w-full grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                  <h1 className="text-blue-600 text-3xl font-semibold">
                    Portfolio Summary
                  </h1>
                  <div className="mt-8 flex flex-row justify-start items-end">
                    <h2 className="text-4xl font-semibold mr-8">
                      {selectedStock}
                    </h2>
                    <span className="text-lg text-gray-400">
                      {lookup[selectedStock]}
                    </span>
                  </div>
                  <div className="mt-8">
                    <StockChart data={chartData} yRange={yRange} />
                  </div>
                </div>
                <div className="col-span-12 2xl:col-span-4">
                  <h2 class="text-blue-600 font-semibold text-3xl 2xl:ml-12 mb-4">
                    Top 5 companies based on your preference
                  </h2>
                  <div className="2xl:ml-12 h-120 bg-white shadow-lg rounded-lg border-gray-200 border-4 overflow-y-scroll">
                    <div className="relative px-8 my-4">
                      <div className="absolute text-gray-600 flex items-center pl-4 h-full cursor-pointer">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        onChange={filterList}
                        ref={stockSearcherRef}
                        id="stock_searcher"
                        value={search}
                        className="text-gray-600 focus:outline-none focus:border bg-gray-50 font-normal w-full h-10 flex items-center pl-12 text-sm border rounded-lg"
                        placeholder="Search for stocks..."
                      />
                    </div>
                    <div className="mt-8">
                      {stockData.map((stock, idx) => (
                        <StockCard
                          key={idx}
                          onSelectCard={onSelectCard}
                          stock={stock}
                          selectedStock={selectedStock}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-16">
                <div className="flex flex-row justify-between">
                  <h1 className="text-blue-600 text-3xl font-semibold">
                    Score Metrics
                  </h1>
                </div>
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
                  {scoreData.map((score, idx) => (
                    <Score
                      key={idx}
                      scoreName={score.scoreName}
                      scoreCount={score.scoreCount}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full  mt-16">
                <h1 className="text-blue-600 text-3xl font-semibold">
                  Featured Articles
                </h1>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article, idx) => (
                    <NewsCard key={idx} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
