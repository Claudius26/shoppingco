import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import camera from '../../images/camera.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        firstname: parsedUser.firstname || '',
        lastname: parsedUser.lastname || '',
        email: parsedUser.email || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (editMode) {
      const updatedUser = {
        ...user,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    setEditMode(!editMode);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        <button
          onClick={handleBack}
          className="text-sm px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32">
          <img
            src={user.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 cursor-pointer shadow-sm"
          >
            <img src={camera} alt="Upload" className="w-5 h-5" />
            <input type="file" id="profilePic" className="hidden" />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          {editMode ? (
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-1 text-gray-800 font-semibold">{user.firstname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          {editMode ? (
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-1 text-gray-800 font-semibold">{user.lastname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-1 text-gray-800 font-semibold">{user.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <p className="mt-1 text-gray-800 font-semibold capitalize">{user.role || 'buyer'}</p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleEditToggle}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-200 ${
            editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {editMode ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
