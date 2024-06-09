const conn = require("../config/configDB");

module.exports = (app) => {
  app.get("/tareas", (req, res) => {
    const query =
      "SELECT id,titulo, descripcion, prioridad, fecha_creacion FROM tarea";
    conn.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ Tareas: results });
      }
    });
  });

  app.post("/tareas", (req, res) => {
    const { titulo, descripcion, prioridad } = req.body;

    const query =
      "INSERT INTO tarea (titulo, descripcion, prioridad) VALUES (?, ?, ?)";
    conn.query(query, [titulo, descripcion, prioridad], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: result.insertId,
        titulo,
        descripcion,
        prioridad,
      });
    });
  });

  app.put("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, prioridad } = req.body;
    const query =
      "UPDATE tarea SET titulo = ?, descripcion = ?, prioridad = ? WHERE id = ?";
    conn.query(query, [titulo, descripcion, prioridad, id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tarea WHERE id = ?";
    conn.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/tareas/search", (req, res) => {
    const { titulo, prioridad } = req.query;
    let query = "SELECT * FROM tarea WHERE 1=1";
    const params = [];
    if (titulo) {
      query += " AND titulo LIKE ?";
      params.push(`%${titulo}%`);
    }
    if (prioridad) {
      query += " AND prioridad = ?";
      params.push(prioridad);
    }
    conn.query(query, params, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });

  app.put("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, prioridad } = req.body;
    const query =
      "UPDATE tarea SET titulo = ?, descripcion = ?, prioridad = ? WHERE id = ?";
    conn.query(query, [titulo, descripcion, prioridad, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Tarea actualizada exitosamente" });
    });
  });

  app.get("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM tarea WHERE id = ?";
    conn.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Tarea no encontrada" });
        return;
      }
      res.json(results[0]);
    });
  });
};
