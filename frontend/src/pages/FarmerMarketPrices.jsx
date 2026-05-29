import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function FarmerMarketPrices() {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await API.get("/market/prices/");
      setPrices(res.data);
    } catch {
      setPrices([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("farmer");
    navigate("/", { replace: true });
  };

  return (
    <div className="farmer-dashboard-page">
      <header className="farmer-header">
        <h2>🌱 AgriConnect</h2>
        <div className="farmer-user">
          <div className="farmer-avatar">{farmer?.name?.charAt(0).toUpperCase() || "F"}</div>
          <div className="farmer-user-info"><strong>{farmer?.name || "Farmer"}</strong><p>Farmer Account</p></div>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="farmer-dashboard-body">
        <aside className="farmer-sidebar">
          <Link to="/farmer-dashboard">🏠 Dashboard</Link>
          <Link to="/weather">🌦 Weather</Link>
          <Link className="active-farmer-link" to="/farmer-market-prices">💰 Market Prices</Link>
          <Link to="/upload-crop">📤 Upload Crops</Link>
          <Link to="/disease-detection">🤖 AI Disease</Link>
        </aside>

        <main className="farmer-main">
          <section className="farmer-welcome-card">
            <div>
              <h1>Market Prices 💰</h1>
              <p>View latest crop prices updated by admin.</p>
            </div>
          </section>

          <div className="table-card">
            <table>
              <thead>
                <tr><th>Crop</th><th>Price</th><th>Unit</th><th>Trend</th></tr>
              </thead>
              <tbody>
                {prices.length === 0 ? (
                  <tr><td colSpan="4" className="empty-table">No market prices available.</td></tr>
                ) : (
                  prices.map((item) => (
                    <tr key={item.id}>
                      <td>{item.crop}</td>
                      <td>₹{item.price}</td>
                      <td>{item.unit}</td>
                      <td>{item.trend}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FarmerMarketPrices;