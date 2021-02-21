import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '@/components/NewsCard';
import { fetchUserData } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';

const NEWS_STUB = require('../data/newsStub.json');

const StockArticles = ({ selectedStock, stockName }) => {
  const auth = useAuth();
  const [impact, setImpact] = useState('broad');
  const [articles, setArticles] = useState(NEWS_STUB);

  useEffect(() => {
    const fetchPreferences = async () => {
      const data = await fetchUserData(auth?.user?.uid);
      const impact = data?.impact;
      setImpact(
        impact === 'broad'
          ? ''
          : impact.charAt(0).toUpperCase() + impact.slice(1)
      );
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news', {
          params: { query: `${stockName} ${impact}` }
        });
        setArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setArticles(NEWS_STUB);
      }
    };

    fetchNews();
  }, [impact, selectedStock]);

  return (
    <div className="w-full  mt-16">
      <h1 className="text-blue-600 text-3xl font-semibold">
        Featured Articles
      </h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default StockArticles;
