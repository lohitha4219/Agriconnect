import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function FarmerDashboard() {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const [myCrops, setMyCrops] = useState([]);
  const [prices, setPrices] = useState([]);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const cropRes = await API.get("/crop/uploads/");
      const priceRes = await API.get("/market/prices/");
      const schemeRes = await API.get("/schemes/");

      setMyCrops(cropRes.data.filter((crop) => crop.email === farmer?.email));
      setPrices(priceRes.data);
      setSchemes(schemeRes.data);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("farmer");
    navigate("/");
  };

  const soldCrops = myCrops.filter((crop) => crop.status === "Sold").length;

  return (
    <div className="farmer-dashboard-page">
      <header className="farmer-header">
        <h2>🌱 AgriConnect</h2>

        <div className="farmer-user">
          <div className="farmer-avatar">
            {farmer?.name?.charAt(0).toUpperCase() || "F"}
          </div>

          <div className="farmer-user-info">
            <strong>{farmer?.name || "Farmer"}</strong>
            <p>Farmer Account</p>
          </div>

          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="farmer-dashboard-body">
        <aside className="farmer-sidebar">
          <Link className="active-farmer-link" to="/farmer-dashboard">
            🏠 Dashboard
          </Link>

          <Link to="/weather">🌦 Weather</Link>

          <Link to="/farmer-market-prices">💰 Market Prices</Link>

          <Link to="/upload-crop">📤 Upload Crops</Link>

          <Link to="/farmer-schemes">📜 Schemes</Link>

          <Link to="/disease-detection">🤖 AI Disease Detection</Link>
        </aside>

        <main className="farmer-main">
          <section className="farmer-welcome-card">
            <div>
              <h1>Welcome, {farmer?.name || "Farmer"} 👨‍🌾</h1>
              <p>Manage your crop uploads and view farming information.</p>
            </div>

            <Link to="/upload-crop" className="upload-btn">
              + Upload Crop
            </Link>
          </section>

          <section className="stats-grid">
            <div className="stats-card">
              <span>📤</span>
              <h2>{myCrops.length > 0 ? myCrops.length : "-"}</h2>
              <p>Total Uploads</p>
            </div>

            <div className="stats-card">
              <span>✅</span>
              <h2>{soldCrops > 0 ? soldCrops : "-"}</h2>
              <p>Sold Crops</p>
            </div>

            <div className="stats-card">
              <span>📜</span>
              <h2>{schemes.length > 0 ? schemes.length : "-"}</h2>
              <p>Schemes</p>
            </div>

            <div className="stats-card">
              <span>💰</span>
              <h2>{prices.length > 0 ? prices.length : "-"}</h2>
              <p>Market Prices</p>
            </div>
          </section>

          <section className="quick-actions">
            <Link to="/weather" className="quick-card">
              <span>🌦</span>
              <h3>Weather</h3>
              <p>Check live weather updates.</p>
            </Link>

            <Link to="/farmer-market-prices" className="quick-card">
              <span>💰</span>
              <h3>Market Prices</h3>
              <p>View crop market prices.</p>
            </Link>

            <Link to="/upload-crop" className="quick-card">
              <span>📤</span>
              <h3>Upload Crops</h3>
              <p>Upload your available crops.</p>
            </Link>

            <Link to="/farmer-schemes" className="quick-card">
              <span>📜</span>
              <h3>Schemes</h3>
              <p>View schemes added by admin.</p>
            </Link>

            <Link to="/disease-detection" className="quick-card">
              <span>🤖</span>
              <h3>AI Disease</h3>
              <p>Detect crop diseases using AI.</p>
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FarmerDashboard;