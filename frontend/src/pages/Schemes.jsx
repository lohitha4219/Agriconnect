import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Schemes() {
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await API.get("/schemes/");
      setSchemes(res.data);
    } catch (error) {
      console.log("Schemes fetch error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const openAddForm = () => {
    setShowForm(true);
    setFormData({
      title: "",
      description: "",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addScheme = async (e) => {
    e.preventDefault();

    try {
      await API.post("/schemes/add/", formData);

      alert("Scheme added successfully");

      setFormData({
        title: "",
        description: "",
      });

      setShowForm(false);

      fetchSchemes();
    } catch (error) {
      alert("Failed to add scheme");
      console.log(error);
    }
  };

  const deleteScheme = async (id) => {
    if (window.confirm("Delete this scheme?")) {
      try {
        await API.delete(`/schemes/delete/${id}/`);

        alert("Scheme deleted successfully");

        fetchSchemes();
      } catch (error) {
        alert("Delete failed");
        console.log(error);
      }
    }
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

          <Link to="/crop-uploads">🌾 Crop Uploads</Link>

          <Link to="/market-prices">💰 Market Prices</Link>

          <Link className="active-link" to="/schemes">
            📜 Schemes
          </Link>
        </aside>

        <main className="panel-main">
          <div className="page-title">
            <h2>Government Schemes</h2>

            <button className="add-btn" onClick={openAddForm}>
              + Add Scheme
            </button>
          </div>

          {showForm && (
            <div className="scheme-form-card">
              <div className="scheme-form-header">
                <h3>Add New Scheme</h3>

                <button className="close-form-btn" onClick={closeForm}>
                  ✕
                </button>
              </div>

              <form onSubmit={addScheme} className="scheme-form">
                <input
                  type="text"
                  name="title"
                  placeholder="Scheme Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="description"
                  placeholder="Scheme Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>

                <div className="scheme-form-actions">
                  <button type="submit" className="save-btn">
                    Save Scheme
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="scheme-list">
            {schemes.length === 0 ? (
              <div className="empty-table">No schemes added yet.</div>
            ) : (
              schemes.map((scheme) => (
                <div className="scheme-card" key={scheme.id}>
                  <div>
                    <h3>{scheme.title}</h3>
                    <p>{scheme.description}</p>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteScheme(scheme.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Schemes;