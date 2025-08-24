import React, { useState } from 'react';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    setSelectedCrypto('');
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (paymentMethod === 'crypto' && !selectedCrypto) {
      alert("Please select a cryptocurrency.");
      return;
    }
    alert("Proceeding to payment...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/40">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-700 text-center drop-shadow-lg">Checkout</h2>

        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6 text-blue-600">Billing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
            <input type="email" placeholder="Email" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
            <input type="text" placeholder="Address" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
            <input type="text" placeholder="City" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
            <input type="text" placeholder="State/Province" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
            <input type="text" placeholder="Zip/Postal Code" className="border border-blue-200 px-4 py-3 rounded-xl bg-white/90 focus:ring-2 focus:ring-sky-400 transition" />
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6 text-blue-600">Payment Method</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => handlePaymentChange('card')}
                className="accent-blue-500"
              />
              <span className="font-semibold text-blue-700">Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => handlePaymentChange('paypal')}
                className="accent-blue-500"
              />
              <span className="font-semibold text-blue-700">PayPal</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value="crypto"
                checked={paymentMethod === 'crypto'}
                onChange={() => handlePaymentChange('crypto')}
                className="accent-blue-500"
              />
              <span className="font-semibold text-blue-700">Cryptocurrency</span>
            </label>
            {paymentMethod === 'crypto' && (
              <div className="ml-8 mt-3">
                <p className="text-sm mb-2 text-blue-500 font-semibold">Select Cryptocurrency:</p>
                <div className="flex gap-4">
                  {['BTC', 'XRP', 'USDT', 'LTC'].map((crypto) => (
                    <button
                      key={crypto}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`px-5 py-2 border rounded-xl font-bold transition ${
                        selectedCrypto === crypto
                          ? 'bg-gradient-to-r from-blue-600 to-sky-400 text-white border-blue-600 scale-105'
                          : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      {crypto}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-sky-600 transition-transform duration-200"
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;