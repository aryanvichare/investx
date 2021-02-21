import React from 'react';

const Impact = () => {
  const impactData = [
    {
      name: 'Broad Impact',
      desc:
        'This option will help you reach your goals while investing in ETFs that meet Environmental, Social, and Governance (ESG) requirements.',
      img: 'city.png'
    },
    {
      name: 'Climate Impact',
      desc:
        'With this option, you can invest in ETFs that support companies with lower carbon emissions and the funding of green projects.',
      img: 'climate.png'
    },
    {
      name: 'Social Impact',
      desc:
        'This offering is based on Broad Impact and adds two funds that support minority empowerment and gender diversity.',
      img: 'social.png'
    }
  ];
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-16 xl:px-0">
      <div className="flex flex-col items-center justify-center">
        <h1 class="text-blue-500 text-4xl font-bold text-center mb-12">
          Choose Your Impact
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-16 lg:gap-36">
          {impactData.map((el, idx) => (
            <div
              key={idx}
              className="group bg-white shadow-lg rounded-lg p-12 border transform hover:scale-105 transition ease-in-out duration-300 hover:bg-blue-500"
            >
              <img className="w-36 mx-auto" src={`/images/${el.img}`} alt="City" />
              <h2 className="text-blue-500 group-hover:text-white text-2xl font-bold text-center mt-4">
                {el.name}
              </h2>
              <p className="text-sm text-center leading-5 text-gray-500 group-hover:text-white mt-2">
                {el.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;
