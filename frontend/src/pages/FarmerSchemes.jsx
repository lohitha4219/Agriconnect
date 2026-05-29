import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function FarmerSchemes() {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await API.get("/schemes/");
      setSchemes(res.data);
    } catch (error) {
      console.log("Schemes error:", error);
      setSchemes([]);
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
          <Link to="/farmer-dashboard">🏠 Dashboard</Link>
          <Link to="/weather">🌦 Weather</Link>
          <Link to="/farmer-market-prices">💰 Market Prices</Link>
          <Link to="/upload-crop">📤 Upload Crops</Link>
          <Link to="/disease-detection">🤖 AI Disease</Link>

          <Link className="active-farmer-link" to="/farmer-schemes">
            📜 Schemes
          </Link>
        </aside>

        <main className="farmer-main">
          <section className="farmer-welcome-card">
            <div>
              <h1>Government Schemes 📜</h1>
              <p>View useful schemes added by admin.</p>
            </div>
          </section>

          <div className="scheme-list">
            {schemes.length === 0 ? (
              <div className="empty-table">No schemes available.</div>
            ) : (
              schemes.map((scheme) => (
                <div className="farmer-scheme-card" key={scheme.id}>
                  <h3>{scheme.title}</h3>
                  <p>{scheme.description}</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FarmerSchemes;