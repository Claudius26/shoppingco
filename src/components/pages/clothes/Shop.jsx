import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../products/productApiSlice";
import { useNavigate } from "react-router";

const Shop = () => {
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [products]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></span>
        <span className="ml-4 text-lg text-sky-700 font-semibold">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-600 font-semibold">
        Failed to load products.
      </div>
    );

  return (
    <section className="px-4 md:px-20 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-700 drop-shadow-md tracking-tight">
        All Products
      </h2>
      {shuffledProducts.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold py-20">
          No products available in the store.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
          {shuffledProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl bg-white"
            >
              <div className="h-32 md:h-40 w-full overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                <h3 className="font-semibold text-white text-sm truncate">Name: {product.title}</h3>
                <p className="text-gray-300 text-xs truncate">Cat: {product.category}</p>
                <p className="text-gray-300 text-xs truncate">Brand: {product.brand || "-"}</p>
                <p className="text-green-400 font-bold text-sm truncate">Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
