import { useState } from "react";
import { API_BASE_URL } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.message === "User registered successfully") {
      showToast("Registered successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>
        <p style={subText}>Register to continue</p>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          style={inputStyle}
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button style={btnStyle} onClick={handleSubmit}>
          Register
        </button>

        <p style={switchText}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f3f6",
};

const cardStyle = {
  width: "360px",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "5px",
};

const subText = {
  textAlign: "center",
  color: "#666",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const switchText = {
  textAlign: "center",
  marginTop: "15px",
};

const linkStyle = {
  color: "#0d6efd",
  fontWeight: "500",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
  textAlign: "center",
};

export default Register;
