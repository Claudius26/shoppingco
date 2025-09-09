import React from 'react';
import { useGetAllProductsQuery } from '../../products/productApiSlice';
import { Link, useNavigate } from 'react-router';

const Shop = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></span>
      <span className="ml-4 text-lg text-sky-700 font-semibold">Loading...</span>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[300px] text-red-600 font-semibold">
      Failed to load products.
    </div>
  );

  return (
    <section className="px-4 md:px-20 py-10 bg-gradient-to-br from-sky-100 via-blue-50 to-white min-h-screen rounded-3xl shadow-lg">
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:underline font-semibold text-blue-600">Home</Link>
        <span className="mx-1 text-blue-400 font-bold">{'>'}</span>
        <span className="text-black font-semibold">Shop</span>
      </div>

      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-lg tracking-tight">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-blue-100 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all bg-white flex flex-col group"
          >
            <div
              className="bg-gradient-to-br from-sky-200 via-blue-100 to-white p-4 rounded-xl h-44 flex justify-center items-center mb-3 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.imageUrl} alt={product.title} className="h-full object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-base font-semibold text-blue-900 mb-1 truncate cursor-pointer group-hover:underline"
            >
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm mb-2 truncate">{product.description}</p>
            <p className="text-blue-500 text-xs mb-2">{product.category}</p>
            <p className="text-green-600 font-bold mt-1 text-lg">${product.price}</p>
            <div className="flex items-center mt-2 text-yellow-500 text-base">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating?.rate || 0) ? '★' : '☆'}
                </span>
              ))}
              <span className="text-gray-600 ml-2 text-sm">{product.rating?.rate || '-'}</span>
            </div>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="mt-4 bg-gradient-to-r from-blue-600 to-sky-400 text-white py-2 rounded-xl hover:scale-105 hover:from-blue-700 hover:to-sky-500 transition-transform font-semibold shadow"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
