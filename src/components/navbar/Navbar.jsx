// import React from 'react'
// import searchIcon from '../../images/search.svg';
// import cartIcon from '../../images/cart.svg';
// import accountIcon from '../../images/account.svg';



// const Navbar = () => {
//   return (
//     <div>
//       <header>
//         <h2>SHOP.CO</h2>
//         <div>
//           <p>Shop <span className="arrow">&#9662;</span></p>
//           <p>On Sale</p>
//           <p>New Arrivals</p>
//           <p>Brands </p>
//         </div>

//         <div>
//           <img src={searchIcon} alt="Search" />
//           <input type="text"  placeholder='Search for products' />
//         </div>

//         <div>
          
//           <img src={cartIcon} alt="Cart" />
//           <img src={accountIcon} alt="Account" />

//         </div>
//       </header>
//     </div>
//   )
// }

// export default Navbar

import React from 'react';
import searchIcon from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import accountIcon from '../../images/account.svg';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-gray-800">SHOP.CO</h2>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-gray-600 text-sm font-medium">
        <p className="hover:text-black cursor-pointer">
          Shop <span className="ml-1">&#9662;</span>
        </p>
        <p className="hover:text-black cursor-pointer">On Sale</p>
        <p className="hover:text-black cursor-pointer">New Arrivals</p>
        <p className="hover:text-black cursor-pointer">Brands</p>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100">
        <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search for products"
          className="bg-transparent focus:outline-none text-sm"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <img src={cartIcon} alt="Cart" classNaOPJHIme="w-5 h-5 cursor-pointer" />
        <img src={accountIcon} alt="Account" className="w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
};

export default Navbar;
