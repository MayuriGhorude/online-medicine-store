import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p style={{ padding: "40px" }}>Loading product...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Product added to cart");
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
      }}
    >
      {/* IMAGE */}
      <img
        src={
          product.image ||
          "https://via.placeholder.com/500x350?text=Medicine"
        }
        alt={product.name}
        style={{
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      />

      {/* DETAILS */}
      <div>
        <h2 style={{ marginBottom: "10px" }}>{product.name}</h2>

        <p style={{ color: "#666", marginBottom: "10px" }}>
          Category: {product.category}
        </p>

        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          {product.description}
        </p>

        <h3 style={{ color: "#0d6efd", marginBottom: "20px" }}>
          ₹ {product.price}
        </h3>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "12px 25px",
            background: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
