const db = require("../config/db");


exports.getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};


exports.getProductById = (req, res) => {
  const productId = req.params.id;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(results[0]); // single product
  });
};
