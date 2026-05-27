import { Link, useNavigate } from "react-router-dom";

function FarmerLayout({ children, activePage }) {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const logout = () => {
    localStorage.removeItem("farmer");
    navigate("/");
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
          <Link className={activePage === "dashboard" ? "active-farmer-link" : ""} to="/farmer-dashboard">🏠 Dashboard</Link>
          <Link className={activePage === "weather" ? "active-farmer-link" : ""} to="/weather">🌦 Weather</Link>
          <Link className={activePage === "prices" ? "active-farmer-link" : ""} to="/farmer-market-prices">💰 Market Prices</Link>
          <Link className={activePage === "upload" ? "active-farmer-link" : ""} to="/upload-crop">📤 Upload Crops</Link>
          <Link className={activePage === "schemes" ? "active-farmer-link" : ""} to="/farmer-schemes">📜 Schemes</Link>
          <Link className={activePage === "disease" ? "active-farmer-link" : ""} to="/disease-detection">🤖 AI Disease</Link>
        </aside>

        <main className="farmer-main">{children}</main>
      </div>
    </div>
  );
}

export default FarmerLayout;