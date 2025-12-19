import { useState } from "react";
import { API_BASE_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        login(data.token);
        showToast("Logged in successfully");
        setTimeout(() => navigate("/products"), 1000);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome Back 👋</h2>
        <p style={subText}>Login to your MediStore account</p>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          style={inputStyle}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button style={btnStyle} onClick={handleSubmit}>
          Login
        </button>

        <p style={switchText}>
          New user?{" "}
          <Link to="/register" style={linkStyle}>
            Create account
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

export default Login;
