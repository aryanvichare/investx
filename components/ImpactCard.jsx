import React from 'react';

const ImpactCard = ({ name, desc, img }) => {
  return (
    <div
      data-name={name.split(' ')[0].toLowerCase()}
      className="group bg-white shadow-lg rounded-lg p-12 border transform hover:scale-105 transition ease-in-out duration-300 hover:bg-blue-500"
    >
      <img class="w-36 mx-auto" src={`/images/${img}`} alt="City" />
      <h2 class="text-blue-500 group-hover:text-white text-2xl font-bold text-center mt-4">
        {name}
      </h2>
      <p className="text-sm text-center leading-5 text-gray-500 group-hover:text-white mt-2">
        {desc}
      </p>
    </div>
  );
};

export default ImpactCard;
