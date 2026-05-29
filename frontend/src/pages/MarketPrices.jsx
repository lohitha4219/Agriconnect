import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function MarketPrices() {
  const navigate = useNavigate();

  const [prices, setPrices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    crop: "",
    price: "",
    unit: "",
    trend: "",
  });

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await API.get("/market/prices/");
      setPrices(res.data);
    } catch (error) {
      console.log("Fetch prices error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditId(null);
    setFormData({
      crop: "",
      price: "",
      unit: "",
      trend: "",
    });
    setShowForm(true);
  };

  const editPrice = (item) => {
    setEditId(item.id);
    setFormData({
      crop: item.crop,
      price: item.price,
      unit: item.unit,
      trend: item.trend,
    });
    setShowForm(true);
  };

  const savePrice = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/market/prices/edit/${editId}/`, formData);
        alert("Price updated successfully");
      } else {
        await API.post("/market/prices/add/", formData);
        alert("Price added successfully");
      }

      setShowForm(false);
      setEditId(null);
      fetchPrices();
    } catch (error) {
      alert("Failed to save price");
      console.log(error);
    }
  };

  const deletePrice = async (id) => {
    if (window.confirm("Delete this price?")) {
      try {
        await API.delete(`/market/prices/delete/${id}/`);
        alert("Price deleted successfully");
        fetchPrices();
      } catch (error) {
        alert("Delete failed");
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

          <Link className="active-link" to="/market-prices">
            💰 Market Prices
          </Link>

          <Link to="/schemes">📜 Schemes</Link>
        </aside>

        <main className="panel-main">
          <div className="page-title">
            <h2>Market Prices</h2>

            <button className="add-btn" onClick={openAddForm}>
              + Add Crop Price
            </button>
          </div>

          {showForm && (
            <div className="form-card">
              <h3>{editId ? "Edit Crop Price" : "Add Crop Price"}</h3>

              <form className="market-form" onSubmit={savePrice}>
                <input
                  type="text"
                  name="crop"
                  placeholder="Crop Name"
                  value={formData.crop}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="unit"
                  placeholder="Unit e.g. Kg / Quintal"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />

                <select
                  name="trend"
                  value={formData.trend}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Trend</option>
                  <option value="Rising">Rising</option>
                  <option value="Stable">Stable</option>
                  <option value="Falling">Falling</option>
                  <option value="Seasonal Rise">Seasonal Rise</option>
                </select>

                <button type="submit" className="save-btn">
                  {editId ? "Update Price" : "Save Price"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Crop Name</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Trend</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {prices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-table">
                      No crop prices added yet.
                    </td>
                  </tr>
                ) : (
                  prices.map((item) => (
                    <tr key={item.id}>
                      <td>{item.crop}</td>
                      <td>₹{item.price}</td>
                      <td>{item.unit}</td>
                      <td>{item.trend}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => editPrice(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deletePrice(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MarketPrices;