import axios from 'axios';

export default async (req, res) => {
  try {
    console.log(req.body);
    const { query } = req.query;

    const NEWS_BASE_URL = ' https://newsapi.org/v2/everything';
    const NEWS_API_KEY = '<api_key>';

    const response = await axios.get(NEWS_BASE_URL, {
      params: { q: query, apiKey: NEWS_API_KEY },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { articles } = response.data;

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error });
  }
};
