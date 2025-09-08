import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import searchIcon from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import accountIcon from '../../images/account.svg';

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const toggleMobileSearch = () => {
    setShowMobileSearch(prev => !prev);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
    setShowMobileSearch(false);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(prev => !prev);
    setShowRoleOptions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowAccountMenu(false);
    navigate('/');
  };

  const cartCount = getCartCount();

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
        <Link to="/shop" className="hover:text-black cursor-pointer">Shop <span className="ml-1">&#9662;</span></Link>
        <Link to="/top-selling" className="hover:text-black cursor-pointer">On Sale</Link>
        <Link to="/new-arrivals" className="hover:text-black cursor-pointer">New Arrivals</Link>
        <Link to="/design-logo-page" className="hover:text-black cursor-pointer">Brands</Link>
      </nav>

      <div className="hidden md:flex items-center space-x-4 relative">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100">
          <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search for products"
            className="bg-transparent focus:outline-none text-sm"
          />
        </div>

        <Link to="/cart" className="relative">
          <img src={cartIcon} alt="Cart" className="w-5 h-5 cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">{cartCount}</span>
          )}
        </Link>

        <div className="relative">
          <img
            src={accountIcon}
            alt="Account"
            className="w-5 h-5 cursor-pointer"
            onClick={toggleAccountMenu}
          />
          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border text-sm z-30">
              {!user && !showRoleOptions && (
                <>
                  <button
                    onClick={() => setShowRoleOptions(true)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Sign Up
                  </button>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Log In
                  </Link>
                </>
              )}

              {!user && showRoleOptions && (
                <>
                  <Link
                    to="/signup?role=buyer"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Register as Buyer
                  </Link>
                  <Link
                    to="/signup?role=seller"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Register as Seller
                  </Link>
                  <button
                    onClick={() => setShowRoleOptions(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Back
                  </button>
                </>
              )}

              {user && (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
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
