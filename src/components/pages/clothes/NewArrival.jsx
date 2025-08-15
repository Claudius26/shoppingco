import React, { useState, useRef } from 'react';
import { useGetAllProductsQuery } from '../../products/productApiSlice';
import { Link } from 'react-router';

const NewArrival = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Unable to load products. {error.message}</div>;

  const newArrivals = products.slice().reverse();
  const visibleProducts = showAll ? newArrivals : newArrivals.slice(0, 4);

  const toggleView = () => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section ref={sectionRef} className="py-12 px-20">
      <h2 className="text-4xl font-bold mb-6 text-center">New Arrivals</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="bg-gray-100 p-4 rounded-md h-40 flex justify-center items-center mb-2">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium">{product.title.slice(0, 35)}...</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 60)}...</p>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <p className="text-green-600 font-semibold mt-1">${product.price}</p>

            <div className="flex items-center mt-2 text-yellow-500 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating.rate) ? '★' : '☆'}
                </span>
              ))}
              <span className="text-gray-600 ml-2">{product.rating.rate}</span>
            </div>

            <button className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={toggleView}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </section>
  );
};

export default NewArrival;
