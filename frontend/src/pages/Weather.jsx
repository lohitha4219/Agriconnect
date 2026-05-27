import FarmerLayout from "./FarmerLayout";

function Weather() {
  return (
    <FarmerLayout activePage="weather">
      <section className="farmer-welcome-card">
        <div>
          <h1>Weather 🌦</h1>
          <p>Useful weather information for farming.</p>
        </div>
      </section>

      <div className="table-card">
        <h2>Kuppam Weather</h2>

        <div className="weather-grid">
          <div className="weather-card">
            <span>🌡️</span>
            <h3>31°C</h3>
            <p>Temperature</p>
          </div>

          <div className="weather-card">
            <span>☁️</span>
            <h3>Partly Cloudy</h3>
            <p>Condition</p>
          </div>

          <div className="weather-card">
            <span>💧</span>
            <h3>62%</h3>
            <p>Humidity</p>
          </div>

          <div className="weather-card">
            <span>🌬️</span>
            <h3>12 km/h</h3>
            <p>Wind Speed</p>
          </div>
        </div>

        <p className="tip-box">
          Tip: Irrigate crops in the evening and avoid spraying during rain.
        </p>
      </div>
    </FarmerLayout>
  );
}

export default Weather;