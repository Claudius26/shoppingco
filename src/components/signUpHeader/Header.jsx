import React, { useState } from 'react';
import cancelButton from '../../images/cancel.svg';
import { Link } from 'react-router';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white">
      <header className="flex items-center justify-between px-4 py-2 relative">
        <p className="mx-auto text-center text-sm">
          Signup and get 20% off your first order.{' '}
          <Link to="/signup" className="underline text-white hover:text-gray-300">
            Sign up now
          </Link>
        </p>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4"
        >
          <img src={cancelButton} alt="cancel" className="h-4 w-4" />
        </button>
      </header>
    </div>
  );
};

export default Header;
