import React, { useState, useRef } from 'react';
import { useGetAllProductsQuery } from '../../products/productApiSlice';
import { Link } from 'react-router';
import { useCart } from '../../../context/CartContext'; 

const TopSelling = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const { addToCart } = useCart(); 
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[300px]">
      <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-400"></span>
      <span className="ml-4 text-lg text-yellow-700 font-semibold">Loading...</span>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[300px] text-red-600 font-semibold">
      Unable to load products. {error.message}
    </div>
  );

  const topSelling = products
    .slice()
    .sort((a, b) => b.rating.count - a.rating.count);

  const visibleProducts = showAll ? topSelling : topSelling.slice(0, 4);

  const toggleView = () => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section ref={sectionRef} className="py-14 px-4 md:px-20 bg-gradient-to-br from-yellow-50 via-yellow-100 to-white rounded-3xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-yellow-700 drop-shadow-lg tracking-tight">Top Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <div key={product.id} className="border border-yellow-100 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all bg-white flex flex-col group">
            <Link to={`/product/${product.id}`}>
              <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white p-4 rounded-xl h-44 flex justify-center items-center mb-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base font-semibold text-yellow-900 mb-1 truncate">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-2 truncate">{product.description}</p>
              <p className="text-yellow-500 text-xs mb-2">{product.category}</p>
              <p className="text-green-600 font-bold mt-1 text-lg">${product.price}</p>
              <div className="flex items-center mt-2 text-yellow-500 text-base">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.round(product.rating.rate) ? '★' : '☆'}
                  </span>
                ))}
                <span className="text-gray-600 ml-2 text-sm">{product.rating.rate}</span>
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-2 rounded-xl hover:scale-105 hover:from-yellow-600 hover:to-yellow-500 transition-transform font-semibold shadow"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={toggleView}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full hover:scale-105 hover:from-yellow-600 hover:to-yellow-500 transition-transform font-bold shadow"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </section>
  );
};

export default TopSelling;