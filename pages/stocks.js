
import Alpaca from '@alpacahq/alpaca-trade-api';

const TOP_10 = ['AAPL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'GOOGL', 'GOOG', 'BRK.B', 'JNJ', 'JPM'];

export async function getServerSideProps(context) {
  const alpaca = new Alpaca({
    keyId: process.env.NEXT_PUBLIC_ALPACA_API_KEY_ID,
    secretKey: process.env.NEXT_PUBLIC_ALPACA_API_SECRET_KEY,
    paper: true,
    usePolygon: false
  })

  const quotes = await Promise.all(TOP_10.map(symbol => alpaca.lastQuote(symbol)));
  const stockList = {}
  quotes.map( data => {
    stockList[data.symbol] = data.last;
  });

  return {
    props: {stockList}
  }
};

export default function Stocks({stockList}) {
  console.log(stockList)
  return (<div>
    { Object.keys(stockList).map(symbol => <p key={symbol}>{`${symbol}: ${stockList[symbol].askprice}`}</p>) }
  </div>);
};