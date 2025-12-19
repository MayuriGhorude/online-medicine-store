const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",   
  user: "root",
  password: "",        
  database: "online_medicine_store",
  port: 3307           
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Failed:", err.message);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

module.exports = db;
