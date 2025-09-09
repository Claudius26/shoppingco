import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router';
import removeIcon from '../../images/remove.svg';

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = totalPrice * 0.2;
  const deliveryFee = 15;
  const finalTotal = totalPrice - discount + deliveryFee;

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const handleCheckout = () => {
    if (isLoggedIn()) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-blue-300 to-blue-500">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Your cart is empty.</h2>
        <Link
          to="/shop"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-blue-500 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-800 text-center tracking-tight drop-shadow-lg">
          Your Cart
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 hover:scale-[1.01] transition"
              >
                <div className="flex items-center justify-between w-full gap-4 flex-wrap sm:flex-nowrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-xl border border-blue-100 bg-white"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-blue-900 break-words">
                      {item.title}
                    </h3>
                    <p className="text-sm text-blue-600">Size: {item.size}</p>
                    <p className="text-sm text-blue-600 flex items-center gap-1">
                      Color:
                      <span
                        className="inline-block w-5 h-5 rounded-full border border-blue-300"
                        style={{ backgroundColor: item.color }}
                      />
                    </p>
                    <p className="mt-2 font-bold text-blue-700 text-lg">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full font-bold hover:bg-blue-200 transition"
                    >
                      –
                    </button>
                    <span className="font-semibold text-blue-900">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full font-bold hover:bg-blue-200 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <img src={removeIcon} alt="Remove" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-blue-200 rounded-2xl p-8 bg-white/90 backdrop-blur shadow-xl space-y-6 h-fit sticky top-10">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Order Summary</h3>
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base text-red-500">
              <span>Discount (-20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 border border-blue-200 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 transition"
              />
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-base font-semibold hover:bg-blue-700 transition">
                Apply
              </button>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Go to Checkout →
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-base text-blue-500 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
