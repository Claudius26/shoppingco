import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useGetAllProductsQuery } from '../products/productApiSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  const productRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [review, setReview] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>Product not found.</div>;

  const colors = ['#000000', '#FF0000', '#0000FF', '#008000'];
  const sizes = ['Small', 'Medium', 'Large'];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImage(`${product.image}?color=${color}`);
  };

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleReviewSubmit = () => {
    if (review.trim()) {
      alert(`Review submitted: ${review}`);
      setReview('');
    }
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const recommended = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div ref={productRef} className="p-8 max-w-6xl mx-auto">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> &gt;{' '}
        <Link to="/shop" className="hover:underline">Shop</Link> &gt;{' '}
        <span className="text-black font-medium">{product.category}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex md:flex-col gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="w-24 h-32 bg-gray-100 flex items-center justify-center p-2 border cursor-pointer rounded">
              <img src={product.image} alt="thumb" className="h-full object-contain" />
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 p-4 rounded-md flex justify-center items-center h-[400px]">
          <img
            src={selectedImage || product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          <p className="text-xl font-semibold text-green-600 mb-2">${product.price}</p>

          <div className="text-yellow-500 text-sm mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(product.rating.rate) ? '★' : '☆'}</span>
            ))}
            <span className="ml-2 text-gray-600">{product.rating.rate}</span>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Select Color:</p>
            <div className="flex gap-3">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColor === color ? 'border-black' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-1 border rounded ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 mb-4">
            <div className="flex items-center border rounded px-2">
              <button onClick={decrement} className="px-2 py-1 text-xl">-</button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                className="w-12 text-center outline-none"
              />
              <button onClick={increment} className="px-2 py-1 text-xl">+</button>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveTab('details')}
          className="border p-4 cursor-pointer hover:shadow rounded"
        >
          <h3 className="text-lg font-bold mb-2">Product Details</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
        </div>
        <div
          onClick={() => setActiveTab('reviews')}
          className="border p-4 cursor-pointer hover:shadow rounded"
        >
          <h3 className="text-lg font-bold mb-2">Reviews</h3>
          <p className="text-sm text-gray-600">View and write customer reviews</p>
        </div>
        <div
          onClick={() => setActiveTab('faq')}
          className="border p-4 cursor-pointer hover:shadow rounded"
        >
          <h3 className="text-lg font-bold mb-2">FAQ</h3>
          <p className="text-sm text-gray-600">See common customer questions</p>
        </div>
      </div>

      {activeTab && (
        <div className="mt-8 border-t pt-6">
          {activeTab === 'details' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Product Details</h3>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Reviews</h3>
              <textarea
                className="w-full border rounded p-3 mb-3"
                rows="4"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                onClick={handleReviewSubmit}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Submit Review
              </button>
            </div>
          )}
          {activeTab === 'faq' && (
            <div>
              <h3 className="text-xl font-bold mb-2">FAQ</h3>
              <p className="mb-2">Q: Is this product available in other colors?</p>
              <p className="text-gray-600 mb-4">A: Yes! Select from the color options above.</p>
              <p className="mb-2">Q: What’s the return policy?</p>
              <p className="text-gray-600">A: 30-day return window, no questions asked.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recommended.map((prod) => (
            <div
              key={prod.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col cursor-pointer"
              onClick={() => navigate(`/product/${prod.id}`)}
            >
              <div className="bg-gray-100 p-4 rounded-md h-40 flex justify-center items-center mb-2">
                <img src={prod.image} alt={prod.title} className="h-full object-contain" />
              </div>
              <h3 className="text-sm font-medium mb-1">
                {prod.title.length > 40 ? prod.title.slice(0, 40) + '...' : prod.title}
              </h3>
              <p className="text-green-600 font-semibold">${prod.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
