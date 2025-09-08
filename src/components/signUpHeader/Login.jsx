import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ use react-router-dom not react-router

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // ✅ Store token + user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Redirect based on role
      if (data.user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/shop');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-md p-10 border border-white/40">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-800 drop-shadow-lg">
          Welcome Back
        </h2>

        {errorMessage && (
          <div className="text-center text-red-600 font-semibold text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded-xl bg-white shadow-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full outline-none text-sm bg-transparent"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-blue-500 text-xs ml-2 font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-blue-700 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-sky-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
