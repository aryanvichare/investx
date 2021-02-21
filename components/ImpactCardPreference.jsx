import React from 'react';

const ImpactCardPreference = ({
  name,
  desc,
  img,
  selected,
  setSelectedImpact
}) => {
  return !selected ? (
    <div
      onClick={setSelectedImpact}
      data-name={name.split(' ')[0].toLowerCase()}
      className="group bg-white shadow-lg rounded-lg p-12 border transform hover:scale-105 transition ease-in-out duration-300 hover:bg-blue-500"
    >
      <img className="w-36 mx-auto" src={`/images/${img}`} alt="City" />
      <h2 className="text-blue-500 group-hover:text-white text-2xl font-bold text-center mt-4">
        {name}
      </h2>
      <p className="text-sm text-center leading-5 text-gray-500 group-hover:text-white mt-2">
        {desc}
      </p>
    </div>
  ) : (
    <div
      data-name={name.split(' ')[0].toLowerCase()}
      className="group bg-blue-500 shadow-lg rounded-lg p-12 border transform hover:scale-105 transition ease-in-out duration-300"
    >
      <img className="w-36 mx-auto" src={`/images/${img}`} alt="City" />
      <h2 className="text-white text-2xl font-bold text-center mt-4">{name}</h2>
      <p className="text-sm text-center leading-5 text-white mt-2">{desc}</p>
    </div>
  );
};

export default ImpactCardPreference;
