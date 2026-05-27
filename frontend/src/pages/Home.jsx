import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="home-page">

        <header className="home-header">
          <div className="logo">
            <h1>Farmer Management System</h1>
          </div>

          <nav className="home-nav">
            <Link to="/admin-login" className="admin-btn">
              Admin Login
            </Link>

            <Link to="/farmer-login" className="farmer-btn">
              Farmer Login
            </Link>

            <Link to="/farmer-signup" className="signup-btn">
              Register
            </Link>
          </nav>
        </header>

        

      </div>

      {/* FEATURES SECTION */}
      <section className="features-section">

        <h1>Our Features</h1>

        <div className="feature-grid">

          <div className="feature-card">
            <span>🌾</span>
            <h3>Crop Uploads</h3>
            <p>
              Farmers can upload and manage crop details easily.
            </p>
          </div>

          <div className="feature-card">
            <span>💰</span>
            <h3>Market Prices</h3>
            <p>
              View latest crop market prices instantly.
            </p>
          </div>

          <div className="feature-card">
            <span>🌦️</span>
            <h3>Weather Updates</h3>
            <p>
              Live weather predictions for better farming decisions.
            </p>
          </div>

          <div className="feature-card">
            <span>🤖</span>
            <h3>AI Disease Detection</h3>
            <p>
              Detect crop diseases using AI image analysis.
            </p>
          </div>

        </div>

      </section>

      <footer className="home-footer">
        © 2026 AgriConnect. All rights reserved.
      </footer>
    </>
  );
}

export default Home;