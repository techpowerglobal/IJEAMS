import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [alertShown, setAlertShown] = useState(false);

  // Password validation regex
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      if (!strongPassword.test(value) && value.length > 0 && !alertShown) {
        window.alert(
          "⚠️ Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        );
        setAlertShown(true);
      }
      if (strongPassword.test(value)) {
        setAlertShown(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!strongPassword.test(form.password)) {
      alert("Please enter a stronger password before registering.");
      return;
    }

    try {
         const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        window.location.href = "/account";
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-page-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="register-page-input"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="register-page-input"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="register-page-input"
      />

      <button type="submit" className="register-page-button">
        Register
      </button>
    </form>
  );
};

export default Register;
