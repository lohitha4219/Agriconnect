import { Link, useNavigate } from "react-router-dom";

function FarmerLayout({ children, activePath }) {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  const logout = () => {
    localStorage.removeItem("farmer");
    navigate("/", { replace: true });
  };

  const avatarLetter = farmer?.name
    ? farmer.name.trim().charAt(0).toUpperCase()
    : "F";

  const userName = farmer?.name || "Farmer";

  const isActive = (path) => {
    if (!activePath) return false;
    return activePath === path;
  };

  return (
    <div className="farmer-panel">
      <header className="farmer-header">
        <h2>AgriConnect Farmer Panel</h2>

        <div className="farmer-user">
          <div className="farmer-avatar">{avatarLetter}</div>
          <div>
            <strong>{userName}</strong>
            <p>Farmer Account</p>
          </div>
          <button
            className="farmer-logout-btn farmer-header-action"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="farmer-body">
        <aside className="farmer-sidebar">
          <Link
            className={isActive("/farmer-dashboard") ? "active-farmer-link" : ""}
            to="/farmer-dashboard"
          >
            Dashboard
          </Link>

          <Link
            className={isActive("/weather") ? "active-farmer-link" : ""}
            to="/weather"
          >
            Weather
          </Link>

          <Link
            className={
              isActive("/farmer-market-prices") ? "active-farmer-link" : ""
            }
            to="/farmer-market-prices"
          >
            Market Prices
          </Link>

          <Link
            className={isActive("/upload-crop") ? "active-farmer-link" : ""}
            to="/upload-crop"
          >
            Upload Crops
          </Link>

          <Link
            className={isActive("/farmer-schemes") ? "active-farmer-link" : ""}
            to="/farmer-schemes"
          >
            Schemes
          </Link>

          <Link
            className={
              isActive("/disease-detection") ? "active-farmer-link" : ""
            }
            to="/disease-detection"
          >
            AI Disease Detection
          </Link>
        </aside>

        <main className="farmer-main">{children}</main>
      </div>
    </div>
  );
}

export default FarmerLayout;

