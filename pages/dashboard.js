import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import Score from '@/components/Score';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import NewsCard from '@/components/NewsCard';
import StockCard from '@/components/StockCard';
import { useAuth } from '@/lib/auth';
import { fromUnixTime } from 'date-fns';

const Dashboard = () => {
  const auth = useAuth();

  const [selectedStock, setSelectedStock] = useState({
    abbr: 'GOOG',
    name: 'Google.com'
  });
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('GOOG');
  const stockSearcherRef = useRef();

  const [chartData, setChartData] = useState([
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
  ]);

  const scoreData = [
    { scoreCount: 97, scoreName: 'Environmental Impact' },
    { scoreCount: 93, scoreName: 'Environmental Impact' },
    { scoreCount: 91, scoreName: 'Environmental Impact' },
    { scoreCount: 88, scoreName: 'Environmental Impact' },
    { scoreCount: 99, scoreName: 'Environmental Impact' },
    { scoreCount: 93, scoreName: 'Environmental Impact' },
    { scoreCount: 96, scoreName: 'Environmental Impact' },
    { scoreCount: 92, scoreName: 'Environmental Impact' }
  ];

  const stockDataSeeded = [
    {
      score: 97,
      abbr: 'AMC',
      name: 'AMC Entertainment',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'SNDL',
      name: 'Sundial Growers Inc.',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'GOOG',
      name: 'Google Inc.',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'AMAZ',
      name: 'Amazon.com',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'CSCO',
      name: 'Cisco Systems',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'FB',
      name: 'Facebook Inc.',
      price: '$5.59',
      df: '+0.49'
    },
    {
      score: 97,
      abbr: 'TWTR',
      name: 'Twitter, Inc.',
      price: '$5.59',
      df: '+0.49'
    }
  ];

  const [stockData, setStockData] = useState(stockDataSeeded);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get('/api/news', {
        params: { query: selectedStock.name }
      });
      setArticles(response.data);
      console.log(response.data);
    };

    fetchNews();
  }, [selectedStock]);

  useEffect(()=> {
    if (!selectedSymbol) {
      return;
    }

    (async () => {
      const { data } = await axios.get(`/api/chart/${selectedSymbol}`);
      console.log(data);
      setChartData(data[selectedSymbol].map(({startEpochTime, openPrice, highPrice, lowPrice, closePrice}) => ({
        name: fromUnixTime(startEpochTime),
        uv: lowPrice,
        pv: highPrice,
        amt: closePrice
      })));
    })();

  }, []);

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
    setSelectedStock({
      abbr: e.target.getAttribute('data-abbr') ?? selectedStock.abbr,
      name: e.target.getAttribute('data-name') ?? selectedStock.name
    });
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 overflow-x-scroll py-12">
          <div className="max-w-screen-xl mx-auto px-4 pt-24">
            <div className="w-full grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <h1 className="text-blue-600 text-3xl font-semibold">
                  Portfolio Summary
                </h1>
                <div className="mt-8 flex flex-row justify-start items-end">
                  <h2 className="text-4xl font-semibold mr-8">
                    {selectedStock.abbr}
                  </h2>
                  <span className="text-lg text-gray-400">
                    {selectedStock.name}
                  </span>
                </div>
                <div className="mt-8">
                  <AreaChart
                    width={850}
                    height={250}
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </div>
              </div>
              <div className="col-span-12 2xl:col-span-4">
                <div className="2xl:ml-12 h-96 bg-white shadow-lg rounded-lg border-gray-200 border-4 overflow-y-scroll">
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
                    {stockData.map((stock) => (
                      <StockCard
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
              <h1 className="text-blue-600 text-3xl font-semibold">
                Score Metrics
              </h1>
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
                {articles.slice(5, 11).map((article, idx) => (
                  <NewsCard key={idx} article={article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
