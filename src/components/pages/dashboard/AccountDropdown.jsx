import { useState } from "react";
import { useNavigate } from "react-router";

const AccountDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
      >
        {user?.firstname?.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-100"
            onClick={() => navigate("/seller/profile")}
          >
            Profi
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-100"
            onClick={() => navigate("/seller/activity")}
          >
            Activity
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
