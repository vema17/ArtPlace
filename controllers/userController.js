const db = require('../config/db');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

  // Verifica que todos los campos estén presentes
  if (!nombre || !apellido || !email || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, apellido, email, contrasena], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.status(201).json({ id: results.insertId, nombre, apellido, email });
  });
};

// Obtener un solo usuario por ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
};

// Actualizar un usuario por ID
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, contrasena } = req.body;

  // Verifica que todos los campos estén presentes
  if (!nombre || !apellido || !email || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ? WHERE id = ?';
  db.query(query, [nombre, apellido, email, contrasena, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    res.json({ id, nombre, apellido, email });
  });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.status(204).send();
  });
};
