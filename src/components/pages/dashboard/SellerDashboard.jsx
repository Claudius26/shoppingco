// src/pages/seller/SellerDashboard.jsx
import React from "react";
import { Link } from "react-router";

const SellerDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome Seller!</h2>
      <p className="mb-6">Manage your ecommerce business easily.</p>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/seller/products"
          className="p-6 bg-white shadow rounded-lg hover:shadow-md"
        >
          Manage Products
        </Link>
        <Link
          to="/seller/orders"
          className="p-6 bg-white shadow rounded-lg hover:shadow-md"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
