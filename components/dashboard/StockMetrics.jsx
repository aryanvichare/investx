import { useEffect, useState } from 'react';
import Score from '@/components/Score';
import axios from 'axios';

const baseData = [
  { scoreCount: 97, scoreName: 'Environmental Impact' },
  { scoreCount: 93, scoreName: 'Labor Practices' },
  { scoreCount: 50, scoreName: 'Social Impact' },
  { scoreCount: 88, scoreName: 'Gender Equality' },
  { scoreCount: 60, scoreName: 'Pay Equality' },
  { scoreCount: 93, scoreName: 'Corporate Activity Impact' },
  { scoreCount: 96, scoreName: 'Short Term Profitability' },
  { scoreCount: 92, scoreName: 'Long Term Profitability' }
];

const StockMetrics = ({selectedStock, stockData}) => {
  const [scoreData, setScoreData] = useState(baseData);
  useEffect(() => {
    (async () => {
      const resp = await axios.get(`api/esg/${selectedStock}`)
      console.log(resp.data);
      const last = resp.data.ratios[0];
      setScoreData([...baseData.slice(0, 6), {scoreCount: Math.round((last.quickRatio + last.cashRatio)*50), scoreName: 'Short Term Profitability'}, baseData[7]]);
    })()
  }, [selectedStock]);

  const { esgScore } = stockData;

  if (esgScore) {
    scoreData[0].scoreCount = esgScore["TR.EnvironmentPillar"].score;
    scoreData[1].scoreCount = esgScore["TR.TRESGWorkforce"].score;
    scoreData[2].scoreCount = esgScore["TR.SocialPillar"].score;
    scoreData[5].scoreCount = esgScore["TR.GovernancePillar"].score;
  };

  return (
    <div className="w-full mt-16">
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="text-blue-600 text-3xl font-semibold">
          Score Metrics
      </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mt-4 lg:mt-0">
          <div className="flex flex-row items-center space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <div>
              <span className="font-bold">{`>70 `}</span>
              <span className="text-xs">(high impact)</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <div>
              <span className="font-bold">{`51 - 70 `}</span>
              <span className="text-xs">(medium impact)</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <div>
              <span className="font-bold">{`<50 `}</span>
              <span className="text-xs">(low impact)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        {scoreData.map((score, idx) => (
          <Score
            key={idx}
            scoreName={score.scoreName}
            scoreCount={score.scoreCount}
          />
        ))}
      </div>
    </div>);
};

export default StockMetrics;