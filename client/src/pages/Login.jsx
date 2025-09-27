import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const res = await fetch(`${API_BASE}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Login failed!");
        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-page-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
          className="login-page-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-page-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="login-page-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
