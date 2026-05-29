import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function CropUploads() {
  const [cropUploads, setCropUploads] = useState([]);
  const navigate = useNavigate();

  const fetchCropUploads = async () => {
    try {
      const response = await API.get("/crop/uploads/");
      setCropUploads(response.data);
    } catch (error) {
      console.log("Crop uploads error:", error);
    }
  };

  useEffect(() => {
    fetchCropUploads();
  }, []);

  const markSold = async (id) => {
    try {
      await API.put(`/crop/sold/${id}/`);
      alert("Crop marked as sold successfully");
      fetchCropUploads();
    } catch (error) {
      alert("Failed to update crop status");
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
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
          <Link to="/farmers">👥 Farmers</Link>
          <Link className="active-link" to="/crop-uploads">
            🌾 Crop Uploads
          </Link>
          <Link to="/market-prices">💰 Market Prices</Link>
          <Link to="/schemes">📜 Schemes</Link>
        </aside>

        <main className="panel-main">
          <div className="panel-title">
            <h1>Manage Crop Uploads</h1>
          </div>

          <section className="crop-upload-admin-card">
            <table className="crop-upload-admin-table">
              <thead>
                <tr>
                  <th>Farmer</th>
                  <th>Crop</th>
                  <th>Village</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cropUploads.length === 0 ? (
                  <tr>
                    <td colSpan="6">No crop uploads yet.</td>
                  </tr>
                ) : (
                  cropUploads.map((crop) => (
                    <tr key={crop.id}>
                      <td>{crop.farmer_name}</td>
                      <td>{crop.crop_name || crop.crop_type}</td>
                      <td>{crop.village}</td>
                      <td>₹{crop.price}</td>
                      <td>
                        <span
                          className={
                            crop.status === "Sold"
                              ? "crop-status-sold"
                              : "crop-status-pending"
                          }
                        >
                          {crop.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        {crop.status === "Sold" ? (
                          <span className="completed-text">Completed</span>
                        ) : (
                          <button
                            className="mark-sold-btn"
                            onClick={() => markSold(crop.id)}
                          >
                            Mark Sold
                          </button>
                        )}
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

export default CropUploads;