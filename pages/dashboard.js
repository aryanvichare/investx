import { useState } from 'react';
import StockChart from '@/components/dashboard/StockChart';
import StockList from '@/components/dashboard/StockList';
import StockMetrics from '@/components/dashboard/StockMetrics';
import StockArticles from '@/components/StockArticles';
import { useAuth } from '@/lib/auth';
import sp500 from '../utils/sp500.json';
import SidePanel from '@/components/SidePanel';

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

const LoadingDashboard = () => (<div className="h-screen">
  <svg
    className="animate-spin h-8 w-8 m-4 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</div>);

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState('GOOG');
  const auth = useAuth();

  return (
    <div className="bg-gray-50 w-full">
      <div className="flex flex-row relative flex-no-wrap">
        <SidePanel auth={auth} />
        {!auth.user ? (
          <LoadingDashboard />
        ) : (
            <div className="flex-1 overflow-x-scroll py-12">
              <div className="max-w-screen-xl mx-auto px-4 pt-24">
                <div className="w-full grid grid-cols-12 gap-6">
                  <StockChart selectedStock={selectedStock} stockName={lookup[selectedStock]} />
                  <StockList stockDataAll={stockDataSeeded} selectedStock={selectedStock} setSelectedStock={symbol => setSelectedStock(symbol)} />
                </div>
                <StockMetrics selectedStock={selectedStock} />
                <StockArticles selectedStock={selectedStock} stockName={lookup[selectedStock]} />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
