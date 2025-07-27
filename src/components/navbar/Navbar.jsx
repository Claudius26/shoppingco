import React from 'react'
import searchIcon from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import accountIcon from '../../images/account.svg';



const Navbar = () => {
  return (
    <div>
      <header>
        <h2>SHOP.CO</h2>
        <div>
          <p>Shop <span className="arrow">&#9662;</span></p>
          <p>On Sale</p>
          <p>New Arrivals</p>
          <p>Brands </p>
        </div>

        <div>
          <img src={searchIcon} alt="Search" />
          <input type="text"  placeholder='Search for products' />
        </div>

        <div>
          
          <img src={cartIcon} alt="Cart" />
          <img src={accountIcon} alt="Account" />

        </div>
      </header>
    </div>
  )
}

export default Navbar