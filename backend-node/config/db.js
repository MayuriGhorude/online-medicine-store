const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitforConnection: true,
  connectionLimit:10,
  queueLimit:0,

  // 🔴 AIVEN + RENDER KE LIYE YE MOST IMPORTANT HAI
  ssl: {
    rejectUnauthorized: false,
  },
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Aiven MySQL connection failed:", err);
    
  } else {
    console.log("✅ Aiven MySQL Connected Successfully");
    connection.release();
  }
});

module.exports = db;
