import React from 'react';
import { format, parseISO } from 'date-fns';

const NewsCard = ({ article }) => {
  return (
    <div className="w-full relative rounded shadow bg-white dark:bg-gray-800">
      <img
        src={article.urlToImage}
        className="w-full h-72 object-cover"
        alt={article.title}
      />
      <div className="py-4 px-6">
        <p className="sm:text-lg text-sm text-gray-500">
          {format(
            parseISO(new Date(article.publishedAt).toISOString()),
            'PPPP'
          )}
        </p>
        <p className="am:text-2xl text-lg font-bold pt-4 text-gray-800">
          {article.title}
        </p>
        <p className="sm:text-lg text-sm leading-5 text-gray-500 pt-3">
          {article.description}
        </p>
        <div className="mt-4 flex flex-row justify-start items-center space-x-1">
          <svg
            className="w-4 h-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          <a
            href={article.url}
            target="_blank"
            className="text-sm leading-4 text-indigo-700"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
