import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function FarmerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFarmer = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/farmer/login/", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      localStorage.setItem("farmer", JSON.stringify(res.data.farmer));

      alert(res.data.message || "Farmer Login Successful");
      navigate("/farmer-dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          "Server Error"
      );
    }
  };

  return (
    <div className="farmer-login-page">
      <div className="farmer-login-box">
        <h2>Farmer Login</h2>
        <p>Farmer Management System</p>

        <form onSubmit={loginFarmer}>
          <label>Farmer Email</label>
          <input
            type="email"
            placeholder="Enter farmer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Farmer Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Farmer Login</button>
        </form>

        <p className="forgot-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p>
          First time user? <Link to="/farmer-signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default FarmerLogin;