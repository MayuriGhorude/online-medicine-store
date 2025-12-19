const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔴 AIVEN + RENDER KE LIYE YE MOST IMPORTANT HAI
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Aiven MySQL connection failed:");
    console.error(err.message);
  } else {
    console.log("✅ Aiven MySQL Connected Successfully");
  }
});

module.exports = db;
