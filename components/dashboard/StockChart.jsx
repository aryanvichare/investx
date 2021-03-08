import { useState, useEffect } from 'react';
import { fromUnixTime, format } from 'date-fns';
import { ExportToCsv } from 'export-to-csv';
import axios from 'axios';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

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

const StockChart = ({ selectedStock, stockName }) => {
  const [chartData, setChartData] = useState(STUB_CHART);
  const [yRange, setYRange] = useState(null);

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
              date: format(fromUnixTime(startEpochTime), 'PP'),
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

  const handleCSVDownload = () => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `InvestX ${selectedStock} Report`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    };

    const convertKeysToCaps = (obj) => {
      var output = {};
      for (let i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
          output[i.toUpperCase()] = convertKeysToCaps(obj[i]);
        } else {
          output[i.toUpperCase()] = obj[i];
        }
      }
      return output;
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(chartData);
  };

  return (
    <div className="col-span-12 lg:col-span-8">
      <h1 className="text-blue-600 text-3xl font-semibold">
        Portfolio Summary
      </h1>
      <div className="flex flex-row justify-between items-end mt-8">
        <div className="flex flex-row justify-start items-end">
          <h2 className="text-4xl font-semibold mr-8 dark:text-white">
            {selectedStock}
          </h2>
          <span className="text-lg text-gray-400 dark:text-white">
            {stockName}
          </span>
        </div>
        <button
          onClick={handleCSVDownload}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg"
        >
          <svg
            className="w-6 h-6 text-gray-500 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
      <div className="mt-8">
        <AreaChart
          width={850}
          height={425}
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#226AE5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#226AE5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34CD9A" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34CD9A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis type="number" domain={yRange} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="low"
            stroke="#226AE5"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="high"
            stroke="#34CD9A"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default StockChart;
