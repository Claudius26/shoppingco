import { useEffect, useState } from "react";

const SellerActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/activities/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch activities");
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.error("Error loading activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Your Activity</h2>
      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">No activities yet.</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((act) => (
            <li
              key={act.id}
              className="p-3 border rounded-lg bg-gray-50 flex justify-between"
            >
              <span>
                <strong>{act.type}</strong> - {act.action} <br />
                <span className="text-sm text-gray-600">{act.detail}</span>
              </span>
              <span className="text-xs text-gray-400">
                {new Date(act.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerActivity;
