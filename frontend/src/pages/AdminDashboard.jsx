import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

 const logout = () => {
  localStorage.removeItem("admin");
  navigate("/");
};
  return (
    <div className="admin-panel">
      <header className="panel-header">
        <h2>🌱 AgriConnect</h2>

        <div className="panel-user">
          <div className="avatar">NS</div>
          <div>
            <strong>NS Lohitha</strong>
            <p>Administrator</p>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="panel-body">
        <aside className="panel-sidebar">
          <Link className="active-link" to="/admin-dashboard">📊 Dashboard</Link>
          <Link to="/farmers">👨‍🌾 Farmers</Link>
          <Link to="/crop-uploads">🌾 Crop Uploads</Link>
          <Link to="/market-prices">💰 Market Prices</Link>
          <Link to="/schemes">📜 Schemes</Link>
        </aside>

        <main className="panel-main">
          <div className="panel-title">
            <h1>Admin Dashboard</h1>
            <Link className="manage-btn" to="/market-prices">
              Manage Prices
            </Link>
          </div>

          <div className="panel-stats">
            <div className="panel-card">
              <span>👨‍🌾</span>
              <h2>Farmers</h2>
              <p>Registered farmer accounts</p>
            </div>

            <div className="panel-card">
              <span>🌾</span>
              <h2>Crops</h2>
              <p>Uploaded crop details</p>
            </div>

            <div className="panel-card">
              <span>✅</span>
              <h2>Sales</h2>
              <p>Completed crop sales</p>
            </div>

            <div className="panel-card">
              <span>💰</span>
              <h2>Prices</h2>
              <p>Market price categories</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;