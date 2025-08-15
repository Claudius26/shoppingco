import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4-4m0 0l-4 4m4-4v8"
                />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-500 text-xs ml-2"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
