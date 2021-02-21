import React from 'react';
import ImpactCard from './ImpactCard';

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
        <h1 className="text-blue-500 text-4xl font-bold text-center mb-12">
          Choose Your Impact
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-16 lg:gap-36">
          {impactData.map((el, idx) => (
            <ImpactCard key={idx} name={el?.name} desc={el?.desc} img={el?.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;
