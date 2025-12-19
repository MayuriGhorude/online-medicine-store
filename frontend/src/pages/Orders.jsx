import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [token]);

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: "20px" }}>My Orders</h2>

      {orders.length === 0 ? (
        <p style={{ color: "#666" }}>
          You have not placed any orders yet.
        </p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={orderCard}>
            <div style={orderHeader}>
              <span>
                <b>Order ID:</b> #{order.id}
              </span>
              <span>
                <b>Date:</b>{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>

            <div style={itemsBox}>
              {order.items.map((item, index) => (
                <div key={index} style={itemRow}>
                  <span>{item.name}</span>
                  <span>
                    ₹{item.price} × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div style={totalBox}>
              Total Amount: ₹{order.total_amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  padding: "40px",
  minHeight: "70vh",
  background: "#f8f9fa",
};

const orderCard = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
  fontSize: "14px",
  color: "#555",
};

const itemsBox = {
  borderTop: "1px solid #eee",
  borderBottom: "1px solid #eee",
  padding: "10px 0",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
};

const totalBox = {
  textAlign: "right",
  marginTop: "10px",
  fontWeight: "bold",
};

export default Orders;
