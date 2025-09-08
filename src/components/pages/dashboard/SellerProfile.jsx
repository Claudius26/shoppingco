import { useState, useEffect } from "react";

const SellerProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({ firstname: storedUser.firstname, lastname: storedUser.lastname, email: storedUser.email });
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/auth/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsEditing(false);
      setMessage("Profile updated successfully");
    } else {
      setMessage(data.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/auth/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordChange(false);
      setMessage("Password changed successfully");
    } else {
      setMessage(data.message || "Failed to change password");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      {message && <p className="text-green-600">{message}</p>}

      {!isEditing ? (
        <div className="space-y-2">
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowPasswordChange(!showPasswordChange)}>Change Password</button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSave}>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}

      {showPasswordChange && (
        <form className="space-y-4 mt-4" onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save Password</button>
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowPasswordChange(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SellerProfile;
