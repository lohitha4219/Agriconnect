import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/farmer/forgot-password/",
        {
          email: email.trim().toLowerCase(),
          new_password: newPassword.trim(),
        }
      );

      alert(
        res.data.message ||
        "Password reset successful"
      );

      navigate("/farmer-login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password reset failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-box">
       <h1>Forgot Password</h1>

        <p>Reset your Farmer account password</p>

        <form onSubmit={resetPassword}>

          <label>Registered Email</label>

          <input
            type="email"
            placeholder="Enter Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">
            Reset Password
          </button>

        </form>

        <p>
          Remember password?
          {" "}
          <Link to="/farmer-login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;