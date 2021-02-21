import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-8 py-48 xl:px-0">
        <div className="flex flex-row items-center justify-center">
          <div className="w-full text-center">
            <h1 className="text-white text-5xl font-semibold">
              Start investing for the better.
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-8 pb-16 xl:px-0">
        <div className="flex flex-row justify-between border-b pb-8 border-gray-50">
          <div className="w-full flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col justify-start">
              <h1 className="text-white text-3xl font-semibold">
                Invest<span className="text-green-400">X</span>
              </h1>
              <div className="flex flex-row space-x-4 mt-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex flex-row justify-center items-center cursor-pointer">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={24} fill="#fff" />
                  </a>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex flex-row justify-center items-center cursor-pointer">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} fill="#fff" />
                  </a>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex flex-row justify-center items-center cursor-pointer">
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={24} fill="#fff" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start mt-8 sm:mt-0">
              <h3 className="text-white uppercase text-sm mb-2">Subscribe</h3>
              <div className="relative">
                <input
                  className="text-gray-600 focus:outline-none focus:border bg-gray-50 font-normal w-72 h-10 flex items-center text-sm border rounded-lg pl-2"
                  placeholder="johndoe@gmail.com"
                />
                <svg
                  class="w-6 h-6 text-gray-400 absolute top-1 left-64 sm:top-1 sm:right-2 transform rotate-45 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto sm:px-8 pt-8 pb-16 xl:px-0">
          <div className="flex flex-col sm:flex-row justify-between">
            <img
              class="w-24 mb-4 sm:mb-0 sm:h-5"
              src="/images/cards.png"
              alt="cards"
            />
            <div class="flex flex-row space-x-8">
              <h5 className="text-xs text-white">Terms and Conditions</h5>
              <h5 className="text-xs text-white">Privacy</h5>
              <h5 className="text-xs text-gray-400">© 2021 InvestX</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
