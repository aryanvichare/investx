
import Alpaca from '@alpacahq/alpaca-trade-api';

const alpaca = new Alpaca({
  keyId: process.env.NEXT_PUBLIC_ALPACA_API_KEY_ID,
  secretKey: process.env.NEXT_PUBLIC_ALPACA_API_SECRET_KEY,
  paper: true,
  usePolygon: false
})

const TIMEFRAME = '15Min';

export default async (req, res) => {
  const { query: { symbol } } = req;

  const data = await alpaca.getBars(TIMEFRAME, symbol);
  res.json(data);
};
