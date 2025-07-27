import React from 'react'
import cancelButton from '../../images/cancel.svg'
import { Link } from 'react-router';

const Header = () => {
  return (
    <div>
      <header>
        <p>Signup and get 20% off your first order. <Link to=''>Sign up now</Link></p>
        <p>
          <img src={cancelButton} alt="cancel" />
        </p>
      </header>
    </div>
  )
}

export default Header