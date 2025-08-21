import React, { useState } from 'react';
import { Link } from 'react-router';
import searchIcon from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import accountIcon from '../../images/account.svg';

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileSearch = () => {
    setShowMobileSearch(prev => !prev);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
    setShowMobileSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between max-w-7xl mx-auto px-6 md:px-20 py-4 shadow-md bg-white relative">
      <div className="flex items-center space-x-4">
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <span className="text-2xl font-bold cursor-pointer">&#9776;</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">SHOP.CO</h2>
      </div>

      <nav className="hidden md:flex space-x-6 text-gray-600 text-sm font-medium">
        <Link to="/shop" className="hover:text-black cursor-pointer">
          Shop <span className="ml-1">&#9662;</span>
        </Link>
        <Link to="/top-selling" className="hover:text-black cursor-pointer">
          On Sale
        </Link>
        <Link to="/new-arrivals" className="hover:text-black cursor-pointer">
          New Arrivals
        </Link>
        <Link to="/design-logo-page" className="hover:text-black cursor-pointer">
          Brands
        </Link>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100">
          <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search for products"
            className="bg-transparent focus:outline-none text-sm"
          />
        </div>
        <img src={cartIcon} alt="Cart" className="w-5 h-5 cursor-pointer" />
        <img src={accountIcon} alt="Account" className="w-5 h-5 cursor-pointer" />
      </div>

      <div className="md:hidden flex items-center space-x-4">
        {showMobileSearch && (
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100 w-40">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-sm w-full"
              autoFocus
            />
          </div>
        )}
        {!showMobileSearch && (
          <button onClick={toggleMobileSearch}>
            <img src={searchIcon} alt="Search" className="w-5 h-5 cursor-pointer" />
          </button>
        )}
        <img src={cartIcon} alt="Cart" className="w-5 h-5 cursor-pointer" />
        <img src={accountIcon} alt="Account" className="w-5 h-5 cursor-pointer" />
      </div>

      {showMobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col items-start space-y-4 px-6 py-4 z-20 md:hidden">
          <Link to="/shop" className="text-gray-700 text-sm font-medium">Shop</Link>
          <Link to="/top-selling" className="text-gray-700 text-sm font-medium">On Sale</Link>
          <Link to="/new-arrivals" className="text-gray-700 text-sm font-medium">New Arrivals</Link>
          <Link to="/design-logo-page" className="text-gray-700 text-sm font-medium">Brands</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
