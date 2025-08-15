import React from 'react';
import { useGetAllProductsQuery } from '../../products/productApiSlice';
import { Link } from 'react-router';

const Shop = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Failed to load products.</div>;

  return (
    <section className="px-4 md:px-20 py-10">
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">Home</Link> {'>'} <span className="text-black font-medium">Shop</span>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
            <div className="bg-gray-100 p-4 rounded-md h-40 flex justify-center items-center mb-2">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">{product.title.slice(0, 40)}...</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 60)}...</p>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <p className="text-green-600 font-semibold mb-2">${product.price}</p>
            

            <div className="flex items-center text-yellow-500 text-sm mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating?.rate) ? '★' : '☆'}
                </span>
              ))}
              <span className="text-gray-600 ml-2">{product.rating?.rate}</span>
            </div>

            <button className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
