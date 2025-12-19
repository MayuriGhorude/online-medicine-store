import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();


  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast("Product added to cart");
  };

  // 🔍 SEARCH + CATEGORY FILTER
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || product.category === category;

    return matchSearch && matchCategory;
  });

  // 🔹 Unique categories for dropdown
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        💊 Available Medicines
      </h2>

      {/* SEARCH + FILTER */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          maxWidth: "600px",
          margin: "0 auto 30px",
        }}
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found
          </p>
        )}

        {filteredProducts.map((product) => (
          <div
  key={product.id}
  onClick={() => navigate(`/product/${product.id}`)}
  style={{
    cursor: "pointer",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  }}
>

            <img
              src={
                product.image ||
                "https://via.placeholder.com/300x200?text=Medicine"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "16px", flexGrow: 1 }}>
              <h3>{product.name}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {product.description}
              </p>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#0d6efd",
                }}
              >
                ₹ {product.price}
              </p>

              <p style={{ fontSize: "13px", color: "#888" }}>
                Category: {product.category}
              </p>
            </div>

            <div style={{ padding: "16px" }}>
              <button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(product);
  }}
>
  Add to Cart
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
