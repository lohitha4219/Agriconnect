import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function FarmerSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/farmer/signup/", {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      });

      console.log("Signup response:", response.data);

      alert("Signup Successful");
      navigate("/farmer-login");
    } catch (error) {
      console.log("Full error:", error);
      console.log("Backend error:", error.response?.data);
      console.log("Status:", error.response?.status);

      alert(JSON.stringify(error.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="form-box">
        <h1>Farmer Signup</h1>
        <p>Create your account</p>

        <form onSubmit={signup}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p>
          Already have account? <Link to="/farmer-login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default FarmerSignup;