import React from 'react';

const Score = ({ scoreCount, scoreName }) => {
  return (
    <div className="shadow-sm rounded-md bg-blue-600 p-8 flex flex-col justify-center items-center">
      <h3 className="text-6xl text-white mb-2">{scoreCount}</h3>
      <p className="text-white text-center text-md">
        {scoreName.split(' ')[0]} <br /> {scoreName.split(' ')[1]}
      </p>
    </div>
  );
};

export default Score;
