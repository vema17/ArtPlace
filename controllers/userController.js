const bcrypt = require('bcrypt');
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

  // Hashear la contraseña antes de guardarla
  const saltRounds = 10;
  bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error al hashear la contraseña' });
    }

    // Insertar el nuevo usuario en la base de datos
    db.query(
      'INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)',
      [nombre, apellido, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error al crear usuario' });
        }
        res.status(201).json({ id: results.insertId, nombre, apellido, email });
      }
    );
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

  if (contrasena) {
    // Hashear la nueva contraseña si se provee
    const saltRounds = 10;
    bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error al hashear la contraseña' });
      }

      // Actualizar el usuario con la nueva contraseña
      db.query(
        'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ? WHERE id = ?',
        [nombre, apellido, email, hashedPassword, id],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario' });
          }
          res.json({ id, nombre, apellido, email });
        }
      );
    });
  } else {
    // Actualizar usuario sin modificar la contraseña
    db.query(
      'UPDATE usuarios SET nombre = ?, apellido = ?, email = ? WHERE id = ?',
      [nombre, apellido, email, id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
        res.json({ id, nombre, apellido, email });
      }
    );
  }
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

// Iniciar sesión
exports.loginUser = (req, res) => {
  const { email, contrasena } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err || results.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(contrasena, user.contrasena);
      
      if (!passwordIsValid) {
          return res.status(401).json({ auth: false, token: null, message: 'Contraseña incorrecta' });
      }

      res.status(200).json({ id: user.id, nombre: user.nombre, email: user.email });
  });
};