import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '@/components/NewsCard';
import { fetchUserData } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';

const NEWS_STUB = [
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Reuters Staff',
    title:
      "Alphabet, Microsoft, Qualcomm protest Nvidia's Arm acquisition: Bloomberg News - Reuters",
    description:
      "Big tech companies including Alphabet Inc, Qualcomm Inc and Microsoft Corp are complaining to U.S. antitrust regulators about Nvidia Corp's agreement to acquire Arm Ltd, Bloomberg News reported https://bloom.bg/3aXoiW1 on Friday.",
    url:
      'https://www.reuters.com/article/us-arm-holdings-m-a-nvidia-idUSKBN2AC298',
    urlToImage:
      'https://static.reuters.com/resources/r/?m=02&d=20210212&t=2&i=1551359505&r=LYNXMPEH1B1JU&w=800',
    publishedAt: '2021-02-12T18:33:00Z',
    content:
      'By Reuters Staff\r\nFILE PHOTO: The logo of technology company Nvidia is seen at its headquarters in Santa Clara, California February 11, 2015. . REUTERS/Robert Galbraith/File Photo\r\n(Reuters) - Big te… [+288 chars]'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Reuters Staff',
    title: 'Alphabet shutting internet balloon venture Loon - Reuters',
    description:
      'Google parent Alphabet Inc announced on Thursday it is shutting down its internet balloon business Loon, saying "the road to commercial viability has proven much longer and riskier than hoped."',
    url: 'https://www.reuters.com/article/us-alphabet-loon-idUSKBN29R02U',
    urlToImage:
      'https://s1.reutersmedia.net/resources_v2/images/rcom-default.png?w=800',
    publishedAt: '2021-01-22T00:59:00Z',
    content:
      'By Reuters Staff\r\nOAKLAND, Calif. (Reuters) - Google parent Alphabet Inc announced on Thursday it is shutting down its internet balloon business Loon, saying the road to commercial viability has prov… [+37 chars]'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Reuters Staff',
    title:
      'Facebook, Google, Twitter CEOs will appear before U.S. House panel on March 25 - Reuters',
    description:
      'The chief executives of Facebook Inc, Alphabet Inc and Twitter will testify before a U.S. House panel on March 25 on "misinformation and disinformation plaguing online platforms."',
    url:
      'https://www.reuters.com/article/us-usa-social-media-congress-idUSKBN2AI2WK',
    urlToImage:
      'https://static.reuters.com/resources/r/?m=02&d=20210218&t=2&i=1552063297&r=LYNXMPEH1H1QV&w=800',
    publishedAt: '2021-02-18T21:29:00Z',
    content:
      'By Reuters Staff\r\nWASHINGTON (Reuters) - The chief executives of Facebook Inc, Alphabet Inc and Twitter will testify before a U.S. House panel on March 25 on misinformation and disinformation plaguin… [+569 chars]'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'David Shepardson',
    title:
      'Internet groups, U.S. Chamber sue Maryland over digital advertising tax - Reuters',
    description:
      "A group representing Amazon.com Inc, Facebook Inc and Alphabet Inc joined the U.S. Chamber of Commerce and others in filing suit on Thursday to challenge Maryland's first-in-the nation new digital advertising tax.",
    url:
      'https://www.reuters.com/article/us-usa-internet-maryland-idUSKBN2AI2VM',
    urlToImage:
      'https://static.reuters.com/resources/r/?m=02&d=20210218&t=2&i=1552062003&r=LYNXMPEH1H1QE&w=800',
    publishedAt: '2021-02-18T21:16:00Z',
    content:
      'WASHINGTON (Reuters) - A group representing Amazon.com Inc, Facebook Inc and Alphabet Inc joined the U.S. Chamber of Commerce and others in filing suit on Thursday to challenge Marylands first-in-the… [+2067 chars]'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Reuters Staff',
    title: 'Google workers to form global union alliance - Reuters',
    description:
      'Google employees from across the globe are forming a union alliance, weeks after more than 200 workers at the search engine giant and other units of parent company Alphabet Inc formed a labor union for U.S. and Canadian offices.',
    url:
      'https://www.reuters.com/article/alphabet-google-union-int-idUSKBN29U1FU',
    urlToImage:
      'https://static.reuters.com/resources/r/?m=02&d=20210125&t=2&i=1548976682&r=LYNXMPEH0O0VN&w=800',
    publishedAt: '2021-01-25T13:33:00Z',
    content:
      "By Reuters Staff\r\nFILE PHOTO: A sign is pictured outs a Google offcie near the company's headquarters in Mountain View, California, U.S., May 8, 2019. REUTERS/Paresh Dave\r\n(Reuters) - Google employee… [+718 chars]"
  },
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Romain Dillet',
    title: 'Alma raises $59.4 million for its Klarna-like payment option',
    description:
      'French startup Alma is raising a $59.4 million Series B funding round (€49 million).  The company has been building a new payment option for expensive goods....',
    url:
      'https://techcrunch.com/2021/01/25/alma-raises-59-4-million-for-its-klarna-like-payment-option/',
    urlToImage:
      'https://s.yimg.com/ny/api/res/1.2/.MRn1XbgqIxOeu2gyTlLYw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwMDA7aD0xMzMz/https://s.yimg.com/uu/api/res/1.2/IX0C_QChecyi5c7RDzTpmQ--~B/aD0zNDU2O3c9NTE4NDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/techcrunch_350/8ab3134f3376ea2e35cf6316ff052b77',
    publishedAt: '2021-01-25T08:10:38Z',
    content:
      'After the FANGs, FAANGs and MAGAs, another acronym taking the investment world by storm is FANGMAN. This acronym is used by traders to refer to stocks of seven of the biggest tech companies in the wo… [+3499 chars]'
  }
];

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
