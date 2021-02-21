
import { useState, useRef } from 'react';
import StockCard from '@/components/dashboard/StockCard';

const StockList = ({ stockDataAll, selectedStock, setSelectedStock }) => {
  const [search, setSearch] = useState('');
  const [stockData, setStockData] = useState(stockDataAll);
  const stockSearcherRef = useRef();

  const filterList = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase();

    const filteredData = stockDataAll.filter(
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

  return (<div className="col-span-12 2xl:col-span-4">
    <h2 className="text-blue-600 text-center font-semibold text-3xl 2xl:ml-12 mb-4">
      Top 5 companies based on your preference
    </h2>
    <div className="2xl:ml-12 h-120 bg-white shadow-lg rounded-lg border-gray-200 border-4">
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
      <div className="mt-8 pb-4 relative h-96">
        <div className="mt-8 max-h-full overflow-y-scroll">
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
  </div>);
};

export default StockList;