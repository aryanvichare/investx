import Score from '@/components/Score';

const scoreData = [
  { scoreCount: 97, scoreName: 'Environmental Impact' },
  { scoreCount: 93, scoreName: 'Environmental Impact' },
  { scoreCount: 50, scoreName: 'Environmental Impact' },
  { scoreCount: 88, scoreName: 'Environmental Impact' },
  { scoreCount: 60, scoreName: 'Environmental Impact' },
  { scoreCount: 93, scoreName: 'Environmental Impact' },
  { scoreCount: 96, scoreName: 'Environmental Impact' },
  { scoreCount: 92, scoreName: 'Environmental Impact' }
];

const StockMetrics = ({selectedStock}) => {
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