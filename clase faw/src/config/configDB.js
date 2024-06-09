const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "faw_tarea",
});

conn.connect((err) => {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log("Conexión exitosa");
});

module.exports = conn;
