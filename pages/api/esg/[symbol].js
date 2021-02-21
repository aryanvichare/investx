import axios from 'axios';

const API = 'https://esg-environmental-social-governance-data.p.rapidapi.com/search';

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;

export default async (req, res) => {
  const { query: { symbol } } = req;

  const resp = await axios.get(API, {
    params: {
      q: symbol
    },
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  });
  
  res.json(resp.data);
};
