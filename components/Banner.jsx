import React from 'react';

const Banner = () => {
  return (
    <div className="bg-green-400">
      <div className="max-w-screen-xl mx-auto px-8 py-16 xl:px-0">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-7/12">
            <h1 className="text-white text-7xl font-medium">Invest</h1>
            <p className="text-white text-lg max-w-xl mt-4">
              Investing in responsible stocks is just the start of your
              financial success. Invest for what matters most in a way that
              aligns with your values.
            </p>
          </div>
          <div className="w-full md:w-5/12">
            <img
              class="w-96 mx-auto pt-16 md:pt-0 text-center"
              src="/images/hands.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
