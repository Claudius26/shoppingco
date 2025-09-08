import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router";

const SellerLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md flex justify-between items-center px-6 py-3">
        <h1
          onClick={() => navigate("/seller/dashboard")}
          className="text-xl font-bold text-blue-700 cursor-pointer"
        >
          Seller Portal
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
          >
            {user?.firstname?.[0] || "S"}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
              <button
                onClick={() => navigate("/seller/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/seller/activity")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Activity
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
