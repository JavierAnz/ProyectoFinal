const conn = require("../config/configDB");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    conn.query("SELECT * FROM usuario", (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });

  app.post("/usuarios", (req, res) => {
    const { email, username, password } = req.body;
    const query =
      "INSERT INTO usuario (email, username, password) VALUES (?, ?, ?)";
    conn.query(query, [email, username, password], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, email, username });
    });
  });

  app.post("/usuarios/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM usuario WHERE username = ? AND password = ?";
    conn.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    });
  });

  // Añade rutas para actualizar y eliminar usuarios si es necesario
};
