import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const StockChart = ({ data, yRange }) => {
  return (
    <AreaChart
      width={850}
      height={425}
      data={data}
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
