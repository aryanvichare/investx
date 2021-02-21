import React from 'react';
import classnames from 'classnames';

const Score = ({ scoreCount, scoreName }) => {
  const stockBg = classnames({
    'bg-blue-600': scoreCount > 70,
    'bg-yellow-500': scoreCount <= 70 && scoreCount > 50,
    'bg-red-500': scoreCount <= 50
  });

  return (
    <div
      className={`shadow-sm rounded-md ${stockBg} p-8 flex flex-col justify-center items-center`}
    >
      <h3 className="text-6xl text-white mb-2">{scoreCount}</h3>
      <p className="text-white text-center text-md">
        {scoreName.split(' ')[0]} <br /> {scoreName.split(' ')[1]}
      </p>
    </div>
  );
};

export default Score;
