import React from 'react';

const StockCard = ({ onSelectCard, stock }) => {
  return (
    <div onClick={onSelectCard} className="flex flex-col overflow-y-scroll">
      <div className="w-full flex flex-row justify-between items-center border-gray-100 border-t-2 border-b-2 p-4">
        <div className="flex flex-row items-center space-x-4">
          <div className="w-10 h-10 bg-blue-500 flex flex-row justify-center items-center rounded-full">
            <span className="text-white text-xl font-semibold">
              {stock.score}
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <h3 class="text-lg text-gray-700 font-semibold leading-0">
              {stock.abbr}
            </h3>
            <p className="text-xs text-gray-400 -mt-1">{stock.name}</p>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <span className="font-medium">{stock.price}</span>
          <span className="text-white bg-green-400 text-xs rounded-full px-2 flex items-center">
            {stock.df}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
