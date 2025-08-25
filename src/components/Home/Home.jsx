import React from 'react';
import { Link } from 'react-router-dom';
import trendingicon from '../../images/trendingoutfit.jpg';
import smallVector from '../../images/smallvector.svg';
import vector from '../../images/Vector.svg';

const HomeView = () => {
  return (
    <div className="bg-[#F0F0F0] flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16 pb-0 mb-0 relative overflow-hidden">
      <div className="md:w-1/2 space-y-6 z-10 relative">
        <h1 className="md:text-[50px] font-extrabold text-black leading-tight">
          FIND CLOTHES <br /> THAT MATCHES YOUR STYLE
        </h1>
        <div className="relative max-w-xl">
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Browse through our diverse range of meticulously crafted garments, designed <br />
            to bring out your individuality and cater to your sense of style.
          </p>
        </div>
        <Link to="/shop" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full md:w-auto text-center">
          Shop Now
        </Link>
        <div className="pt-6 flex flex-col items-center md:flex-row md:justify-start md:space-x-6 md:items-start">
          <div className="flex space-x-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold">200+</h4>
              <p className="text-sm text-gray-500">International Brands</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold">2,000+</h4>
              <p className="text-sm text-gray-500">High-Quality Products</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h4 className="text-xl font-semibold">30,000+</h4>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0 relative z-0 flex justify-center">
        <div className="relative">
          <img
            src={smallVector}
            alt="decor"
            className="absolute z-10 block w-5"
            style={{
              top: '45%',
              left: '10%',
            }}
          />
          <img
            src={trendingicon}
            alt="Models"
            className="w-full max-w-md md:max-w-lg mx-auto"
          />
          <img
            src={vector}
            alt="decor"
            className="absolute top-[22%] right-6 w-6 md:w-9"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
