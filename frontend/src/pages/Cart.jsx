import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { API_BASE_URL } from "../services/api";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to checkout");
      return navigate("/login");
    }

    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: cart, total }),
    });

    if (res.ok) {
      showToast("Order placed successfully");
      clearCart();
      navigate("/orders");
    } else {
      showToast("Something went wrong");
    }
  };

  return (
    <div style={pageStyle}>
      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={card}>
              <img
                src={item.image}
                alt={item.name}
                style={img}
              />

              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                style={removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button style={checkoutBtn} onClick={placeOrder}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

/* styles */
const pageStyle = {
  padding: "40px",
  minHeight: "70vh",
};

const card = {
  display: "flex",
  alignItems: "center",
  background: "white",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const img = {
  width: "100px",
  height: "80px",
  objectFit: "cover",
  marginRight: "20px",
};

const removeBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const checkoutBtn = {
  background: "#0d6efd",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  marginTop: "20px",
  cursor: "pointer",
};

export default Cart;
