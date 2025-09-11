import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useGetAllProductsQuery } from '../products/productApiSlice';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const { addToCart } = useCart();

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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></span>
      <span className="ml-4 text-lg text-sky-700 font-semibold">Loading...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[300px] text-red-600 font-semibold">
      Error: {error.message}
    </div>
  );

  if (!products || products.length === 0) return null;

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  const colors = ['#000000', '#FF0000', '#0000FF', '#008000'];
  const sizes = ['Small', 'Medium', 'Large'];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImage(`${product.imageUrl}?color=${color}`);
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

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before adding to cart.');
      return;
    }
    addToCart({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div ref={productRef} className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-sky-100 via-blue-50 to-white rounded-3xl shadow-lg">
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:underline font-semibold text-blue-600">Home</Link>
        <span className="mx-1 text-blue-400 font-bold">{'>'}</span>
        <Link to="/shop" className="hover:underline font-semibold text-blue-600">Shop</Link>
        <span className="mx-1 text-blue-400 font-bold">{'>'}</span>
        <span className="text-black font-semibold">{product.category}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex md:flex-col gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="w-24 h-32 bg-white flex items-center justify-center p-2 border border-blue-100 cursor-pointer rounded-xl shadow hover:scale-105 transition">
              <img src={product.imageUrl} alt="thumb" className="h-full object-contain" />
            </div>
          ))}
        </div>

        <div className="flex-1 bg-white p-4 rounded-2xl flex justify-center items-center h-[400px] shadow">
          <img
            src={selectedImage || product.imageUrl}
            alt={product.title}
            className="h-full object-contain transition-transform duration-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-4 text-blue-900">Name: {product.title}</h1>
          <p className="text-gray-700 mb-4">Description: {product.description}</p>
          <p className="text-sm text-blue-500 mb-2">Category: {product.category}</p>
          <p className="text-2xl font-bold text-green-600 mb-2">Price: ${product.price}</p>

          <div className="text-yellow-500 text-base mb-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(product.rating?.rate || 0) ? '★' : '☆'}</span>
            ))}
            <span className="ml-2 text-gray-600">{product.rating?.rate || '-'}</span>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Select Color:</p>
            <div className="flex gap-3">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-blue-700 scale-110' : 'border-gray-200'} transition`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-sm text-gray-600">
                Selected Color:
                <span className="inline-block w-4 h-4 rounded-full ml-1 align-middle border" style={{ backgroundColor: selectedColor }} />
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-1 border rounded-xl font-semibold transition ${selectedSize === size ? 'bg-blue-700 text-white border-blue-700 scale-105' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="mt-2 text-sm text-gray-600">Selected Size: {selectedSize}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 mb-4">
            <div className="flex items-center border border-blue-200 rounded-xl px-2 bg-white">
              <button onClick={decrement} className="px-2 py-1 text-xl font-bold text-blue-700">-</button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                className="w-12 text-center outline-none bg-transparent font-semibold"
              />
              <button onClick={increment} className="px-2 py-1 text-xl font-bold text-blue-700">+</button>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-sky-400 text-white px-6 py-2 rounded-xl font-bold hover:scale-105 hover:from-blue-700 hover:to-sky-500 transition-transform shadow"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveTab('details')}
          className={`border p-4 cursor-pointer rounded-xl shadow transition ${activeTab === 'details' ? 'border-blue-600 bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
        >
          <h3 className="font-bold text-blue-700 mb-2">Product Details</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>

        <div
          onClick={() => setActiveTab('specs')}
          className={`border p-4 cursor-pointer rounded-xl shadow transition ${activeTab === 'specs' ? 'border-blue-600 bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
        >
          <h3 className="font-bold text-blue-700 mb-2">Specifications</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Brand: {product.category}</li>
            <li>Weight: 1.2kg</li>
            <li>Material: Premium synthetic</li>
          </ul>
        </div>

        <div
          onClick={() => setActiveTab('reviews')}
          className={`border p-4 cursor-pointer rounded-xl shadow transition ${activeTab === 'reviews' ? 'border-blue-600 bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
        >
          <h3 className="font-bold text-blue-700 mb-2">Customer Reviews</h3>
          <p className="text-sm text-gray-600 mb-2">"Great product!" — John</p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review"
            className="w-full mt-2 p-2 border border-blue-200 rounded-xl resize-none"
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
              onClick={() => navigate(`/product/${rec.id}`)}
            >
              <img src={rec.imageUrl} alt={rec.title} className="h-40 mx-auto object-contain" />
              <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">{rec.title}</h3>
              <p className="text-green-600 font-bold mt-1">${rec.price}</p>
              <div className="text-yellow-500 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(rec.rating?.rate || 0) ? '★' : '☆'}</span>
                ))}
                <span className="ml-1 text-gray-500">{rec.rating?.rate || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
