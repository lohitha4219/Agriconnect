import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Farmers() {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);

  const fetchFarmers = async () => {

    try {
      const res = await API.get("/farmers/");
      setFarmers(res.data);
    } catch (error) {
      console.log("Farmers error:", error);
    }
  };

  const fetchCrops = async () => {
    try {
      const res = await API.get("/crop/uploads/");
      setCrops(res.data);
    } catch (error) {
      console.log("Crops error:", error);
    }
  };

  useEffect(() => {
    const run = async () => {
      await fetchFarmers();
      await fetchCrops();
    };
    void run();
  }, []);

  const deleteFarmer = async (id) => {

    if (window.confirm("Delete this farmer?")) {
      try {
        await API.delete(`/farmers/delete/${id}/`);
        alert("Farmer deleted successfully");
        fetchFarmers();
      } catch {
        alert("Failed to delete farmer");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("farmer");
    navigate("/", { replace: true });
  };

  const getCropCount = (farmer) => {
    return crops.filter((crop) => crop.email === farmer.email).length;
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
          <Link to="/admin-dashboard">📊 Dashboard</Link>
          <Link className="active-link" to="/farmers">👥 Farmers</Link>
          <Link to="/crop-uploads">🌾 Crop Uploads</Link>
          <Link to="/market-prices">💰 Market Prices</Link>
          <Link to="/schemes">📜 Schemes</Link>
        </aside>

        <main className="panel-main">
          <div className="panel-title">
            <h1>Farmer Management</h1>
          </div>

          <section className="farmers-card">
            <table className="farmers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Uploaded Crops</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {farmers.length === 0 ? (
                  <tr>
                    <td colSpan="5">No farmers registered yet.</td>
                  </tr>
                ) : (
                  farmers.map((farmer) => (
                    <tr key={farmer.id}>
                      <td>{farmer.name}</td>
                      <td>{farmer.email}</td>
                      <td>{farmer.mobile}</td>
                      <td>{getCropCount(farmer)} Crops</td>
                      <td>
                        <button
                          className="farmer-delete-btn"
                          onClick={() => deleteFarmer(farmer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Farmers;