import React from 'react';

const StockCard = ({ onSelectCard, stock, selectedStock }) => {
  if (!stock || !selectedStock) {
    return null;
  }
  const { name, abbr, score, price, df } = stock;
  return (
    <div
      onClick={onSelectCard}
      data-name={name}
      data-abbr={abbr}
      className={`w-full flex flex-row justify-between items-center border-gray-100 border-t-2 border-b-2 p-4 cursor-pointer ${selectedStock === abbr && 'bg-blue-200'
        }`}
    >
      <div className="flex flex-row items-center space-x-4">
        <div className="w-10 h-10 bg-blue-500 flex flex-row justify-center items-center rounded-full">
          <span className="text-white text-xl font-semibold">
            {score}
          </span>
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-lg text-gray-700 font-semibold leading-0">
            {abbr}
          </h3>
          <p className="text-xs text-gray-400 -mt-1">{name}</p>
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <span className="font-medium">{price}</span>
        <span className={`text-white text-xs rounded-full px-2 flex items-center 
          ${df[0] === '+' ? 'bg-green-400' : df[0] === '-' ? 'bg-red-400' : 'bg-gray-400'}`}>
          {df}
        </span>
      </div>
    </div>
  );
};

export default StockCard;
