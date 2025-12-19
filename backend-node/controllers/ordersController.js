const db = require("../config/db");

/* Place Order */
exports.placeOrder = (req, res) => {
  const userId = req.user.id;
  const { items, total } = req.body;

  await db.query(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [userId, total],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const orderId = result.insertId;

      const values = items.map(item => [
        orderId,
        item.id,
        item.qty,
        item.price
      ]);

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
        [values],
        () => {
          res.json({ message: "Order placed successfully" });
        }
      );
    }
  );
};

/* Get Orders with Product Details */
exports.getOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      o.id AS order_id,
      o.total_amount,
      o.created_at,
      p.name AS product_name,
      oi.quantity,
      oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  await db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json(err);

    
    const orders = {};

    rows.forEach(row => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          orderId: row.order_id,
          total: row.total_amount,
          date: row.created_at,
          items: []
        };
      }

      orders[row.order_id].items.push({
        name: row.product_name,
        quantity: row.quantity,
        price: row.price
      });
    });

    res.json(Object.values(orders));
  });
};

