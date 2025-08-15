import React from 'react'
import emailIcon from '../../images/email.svg'
import twitterIcon from '../../images/twitter.svg'
import facebookIcon from '../../images/facebook.svg'
import instagramIcon from '../../images/instagram.svg'
import visaIcon from '../../images/visa.svg'
import mastercardIcon from '../../images/mastercard.svg'
import paypalIcon from '../../images/paypal.svg'
import appleayIcon from '../../images/applepay.svg'
import googlepayIcon from '../../images/googlepay.svg'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 px-5 lg:px-[120px] pt-16 pb-10">
      <div className="bg-black rounded-md p-6 mb-14 text-white flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h2 className="text-2xl font-semibold mb-6 lg:mb-0 lg:max-w-md">
          STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img src={emailIcon} alt="Email Icon" className="w-5 h-5" />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded border border-gray-300 bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition w-full">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

<div className="flex flex-col lg:flex-row flex-wrap justify-between gap-10 text-sm text-gray-700 mb-14">
  <div className="lg:max-w-sm">
    <h2 className="text-black text-2xl font-bold mb-4">SHOP.CO</h2>
    <p className="mb-6">
      We have clothes that suit your style and which you’re proud to wear. From women to men.
    </p>
    <div className="flex gap-4">
      <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
      <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
      <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
    </div>
  </div>

  <div>
    <h3 className="text-black font-semibold mb-3">COMPANY</h3>
    <ul className="space-y-2">
      <li>About</li>
      <li>Features</li>
      <li>Works</li>
      <li>Career</li>
    </ul>
  </div>

  <div>
    <h3 className="text-black font-semibold mb-3">HELP</h3>
    <ul className="space-y-2">
      <li>Support</li>
      <li>Delivery Details</li>
      <li>Privacy Policy</li>
      <li>Terms of Conditions</li>
    </ul>
  </div>

  <div>
    <h3 className="text-black font-semibold mb-3">FAQ</h3>
    <ul className="space-y-2">
      <li>Account</li>
      <li>Manage Deliveries</li>
      <li>Orders</li>
      <li>Payments</li>
    </ul>
  </div>

  <div>
    <h3 className="text-black font-semibold mb-3">RESOURCES</h3>
    <ul className="space-y-2">
      <li>Free eBooks</li>
      <li>Development Tutorial</li>
      <li>How to Blog</li>
      <li>Youtube Playlist</li>
    </ul>
  </div>
</div>


      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-t border-gray-300 pt-8 text-sm text-gray-600">
        <p className="text-center lg:text-left">Shop.co © 2000–2023. All rights reserved.</p>
        <div className="flex gap-4">
          <img src={visaIcon} alt="Visa" className="h-6" />
          <img src={mastercardIcon} alt="Mastercard" className="h-6" />
          <img src={paypalIcon} alt="PayPal" className="h-6" />
          <img src={appleayIcon} alt="Apple Pay" className="h-6" />
          <img src={googlepayIcon} alt="Google Pay" className="h-6" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
