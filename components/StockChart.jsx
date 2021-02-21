import { useState, useEffect } from 'react';
import { fromUnixTime, formatISO9075 } from 'date-fns';
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

const StockChart = ({ selectedStock }) => {
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

  return (
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
  );
};

export default StockChart;
