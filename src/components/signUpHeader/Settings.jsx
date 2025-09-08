import { useState } from "react";

const Settings = () => {
  const [openSection, setOpenSection] = useState(null);
  const [password, setPassword] = useState({ current: "", newPass: "", confirm: "" });
  const [accountInfo, setAccountInfo] = useState({ name: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cryptoCurrency, setCryptoCurrency] = useState("btc");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>

        {[
          {
            key: "account",
            title: "Account Info",
            content: (
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Your Name"
                    value={accountInfo.name}
                    onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="you@example.com"
                    value={accountInfo.email}
                    onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="123-456-7890"
                    value={accountInfo.phone}
                    onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                  Save Info
                </button>
              </div>
            ),
          },
          {
            key: "password",
            title: "Change Password",
            content: (
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={password.newPass}
                    onChange={(e) => setPassword({ ...password, newPass: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                  Update Password
                </button>
              </div>
            ),
          },
          {
            key: "payment",
            title: "Payment Settings",
            content: (
              <div className="grid gap-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="card">💳 Credit/Debit Card</option>
                  <option value="paypal">🅿️ PayPal</option>
                  <option value="bank">🏦 Bank Transfer</option>
                  <option value="crypto">₿ Crypto</option>
                </select>
                {paymentMethod === "crypto" && (
                  <div className="grid gap-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Choose Cryptocurrency</label>
                    <select
                      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      value={cryptoCurrency}
                      onChange={(e) => setCryptoCurrency(e.target.value)}
                    >
                      <option value="btc">₿ Bitcoin (BTC)</option>
                      <option value="eth">Ξ Ethereum (ETH)</option>
                      <option value="ltc">Ł Litecoin (LTC)</option>
                      <option value="xrp">✕ XRP</option>
                    </select>
                  </div>
                )}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                  Save Payment Method
                </button>
              </div>
            ),
          },
        ].map((section) => (
          <div
            key={section.key}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 transition"
              onClick={() => toggleSection(section.key)}
            >
              {section.title}
              <span className="text-gray-500">{openSection === section.key ? "▲" : "▼"}</span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openSection === section.key
                  ? "max-h-screen opacity-100 p-6 border-t"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
