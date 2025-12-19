import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{
          background: "linear-gradient(135deg, #0d6efd, #4e9cff)",
          color: "white",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "15px" }}>
          Your Trusted Online Medicine Store
        </h1>

        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "auto" }}>
          Order genuine medicines online with fast delivery, secure payments,
          and trusted brands.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/products">
            <button
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                background: "white",
                color: "#0d6efd",
                border: "none",
                marginRight: "10px",
              }}
            >
              Shop Medicines
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                background: "transparent",
                color: "white",
                border: "2px solid white",
              }}
            >
              Create Account
            </button>
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: "50px 40px", background: "#f5f7fb" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Why Choose MediStore?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          {[
            {
              title: "✔ Genuine Medicines",
              desc: "All medicines are sourced from trusted suppliers.",
            },
            {
              title: "🚚 Fast Delivery",
              desc: "Quick and safe delivery to your doorstep.",
            },
            {
              title: "🔒 Secure Payments",
              desc: "Your data and payments are fully secure.",
            },
            {
              title: "💬 Easy Support",
              desc: "Customer support for all your needs.",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "#555", fontSize: "14px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        style={{
          padding: "50px",
          textAlign: "center",
          background: "white",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          Start ordering medicines today
        </h2>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          Sign up now and get access to our full catalog.
        </p>

        <Link to="/register">
          <button
            style={{
              padding: "12px 30px",
              fontSize: "16px",
              background: "#0d6efd",
              color: "white",
              border: "none",
            }}
          >
            Register Now
          </button>
        </Link>
      </section>
    </>
  );
}

export default Home;
