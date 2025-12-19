import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { token, logout } = useAuth();
  const { cart = [] } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav style={navStyle}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        MediStore
      </h2>

      <div style={linkBox}>
      <Link style={linkStyle} to="/">Home</Link>

        <Link style={linkStyle} to="/products">Products</Link>

        <Link style={cartLink} to="/cart">
          Cart
          {totalItems > 0 && <span style={badge}>{totalItems}</span>}
        </Link>

        {token ? (
          <>
            <Link style={linkStyle} to="/orders">My Orders</Link>
            <button style={logoutBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={linkStyle} to="/login">Login</Link>
            <Link style={linkStyle} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

/* styles */
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "#0d6efd",
  color: "white",
};

const linkBox = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const cartLink = {
  position: "relative",
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const badge = {
  position: "absolute",
  top: "-8px",
  right: "-12px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  padding: "2px 7px",
  fontSize: "12px",
};

const logoutBtn = {
  background: "white",
  color: "#0d6efd",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;
