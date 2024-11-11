const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { uploadProfileImage } = require('../middleware/upload'); 
const { sendMessageToProduct } = require('../config/rabbitmqService');

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(contrasena, user.contrasena);

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null, message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    // Enviar el ID del usuario al microservicio de productos a través de RabbitMQ
    await sendMessageToProduct({ action: 'user_login', userId });

    // Enviar el token como cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 * 1000, // 24 horas en milisegundos
    });

    res.status(200).json({ auth: true, id: user.id, nombre: user.nombre, email: user.email });
  });
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Eliminar la cookie del token
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};


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
          console.error('Error al crear usuario en la base de datos:', err);
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

  const updates = [nombre, apellido, email];
  let query = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?';

  if (contrasena) {
      const saltRounds = 10;
      bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
          if (err) {
              return res.status(500).json({ error: 'Error al hashear la contraseña' });
          }
          updates.push(hashedPassword);
          query += ', contrasena = ?';
          updates.push(id);
          query += ' WHERE id = ?';

          db.query(query, updates, (err, results) => {
              if (err) {
                  return res.status(500).json({ error: 'Error al actualizar usuario' });
              }
              res.json({ id, nombre, apellido, email });
          });
      });
  } else {
      updates.push(id);
      query += ' WHERE id = ?';

      db.query(query, updates, (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error al actualizar usuario' });
          }
          res.json({ id, nombre, apellido, email });
      });
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

// Obtener el perfil de un usuario
exports.getUserProfile = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM perfil WHERE id_usuario = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener perfil' });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'Perfil no encontrado' });
      }
      res.json(results[0]);
  });
};

// Crear un perfil para un usuario
exports.createUserProfile = (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, bio, street, streetNumber, city, state, postalCode, country, socialMedia = [], contacts = [] } = req.body;

  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename; 
  }

  // Crear perfil en la base de datos
  db.query(
    `INSERT INTO perfil (id_usuario, nombre_usuario, biografia, foto_perfil)
     VALUES (?, ?, ?, ?)`,
    [id, nombre_usuario, bio, profileImage],
    (error, result) => {
      if (error) {
        console.error('Error al crear perfil:', error);
        return res.status(500).json({ message: 'Error al crear el perfil' });
      }

      // Crear dirección del usuario
      db.query(
        `INSERT INTO direccion_de_usuario (id_usuario, calle, numero, ciudad, estado, codigo_postal, pais)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, street, streetNumber, city, state, postalCode, country],
        (error, result) => {
          if (error) {
            console.error('Error al crear dirección:', error);
            return res.status(500).json({ message: 'Error al crear la dirección' });
          }

          // Crear entradas para redes sociales
          if (Array.isArray(socialMedia) && socialMedia.length > 0) {
            let socialMediaCount = 0;
            socialMedia.forEach(url => {
              db.query(
                `INSERT INTO RRSS (URL_RRSS, id_usuario, Nombre_RRSS)
                 VALUES (?, ?, ?)`,
                [url, id, url],
                (error, result) => {
                  if (error) {
                    console.error('Error al insertar redes sociales:', error);
                    return res.status(500).json({ message: 'Error al insertar redes sociales' });
                  }

                  // Incrementar el contador y verificar si todas las redes sociales fueron procesadas
                  socialMediaCount++;
                  if (socialMediaCount === socialMedia.length) {
                    // Todas las redes sociales fueron insertadas
                    insertContacts(contacts, id, res);
                  }
                }
              );
            });
          } else {
            // Si no hay redes sociales, saltar al siguiente paso (contactos)
            insertContacts(contacts, id, res);
          }
        }
      );
    }
  );
};

// Función para insertar contactos
function insertContacts(contacts, userId, res) {
  if (Array.isArray(contacts) && contacts.length > 0) {
    let contactsCount = 0;
    contacts.forEach(phone => {
      db.query(
        `INSERT INTO Contactos (Telefono, ID_usuario)
         VALUES (?, ?)`,
        [phone, userId],
        (error, result) => {
          if (error) {
            console.error('Error al insertar contactos:', error);
            return res.status(500).json({ message: 'Error al insertar contactos' });
          }

          // Incrementar el contador y verificar si todos los contactos fueron procesados
          contactsCount++;
          if (contactsCount === contacts.length) {
            // Todos los contactos fueron insertados
            return res.status(201).json({ message: 'Perfil creado con éxito' });
          }
        }
      );
    });
  } else {
    // Si no hay contactos, devolver éxito
    return res.status(201).json({ message: 'Perfil creado con éxito' });
  }
}



// Actualizar un perfil de usuario
exports.updateUserProfile = (req, res) => {
  const id = req.user.id;
  const { nombre_usuario, bio } = req.body;
  let profileImage = req.file ? `uploads/${req.file.filename}` : null;

  const updateQuery = `
    UPDATE perfil 
    SET nombre_usuario = ?, biografia = ?, foto_perfil = COALESCE(?, foto_perfil)
    WHERE id_usuario = ?
  `;

  db.query(updateQuery, [nombre_usuario, bio, profileImage, id], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err); // Agrega un log para depurar errores en la base de datos
      return res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
    res.json({ id_usuario: id, nombre_usuario, bio, profileImage });
  });
};

// Obtener dirección de un usuario
exports.getUserAddress = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM direccion_de_usuario WHERE id_usuario = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener dirección' });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'Dirección no encontrada' });
      }
      res.json(results[0]);
  });
};

// Crear dirección para un usuario
exports.createUserAddress = (req, res) => {
  const id = req.user.id;
  const { calle, numero, ciudad, estado, codigo_postal, pais } = req.body;

  db.query(
      'INSERT INTO direccion_de_usuario (id_usuario, calle, numero, ciudad, estado, codigo_postal, pais) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, calle, numero, ciudad, estado, codigo_postal, pais],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error al crear dirección' });
          }
          res.status(201).json({ id_calle: results.insertId, calle, numero, ciudad, estado, codigo_postal, pais });
      }
  );
};

// Actualizar dirección de usuario
exports.updateUserAddress = (req, res) => {
  const id = req.user.id; // Asegúrate de que el ID del usuario esté presente
  const { calle, numero, ciudad, estado, codigo_postal } = req.body;

  db.query(
      'UPDATE direccion_de_usuario SET calle = ?, numero = ?, ciudad = ?, estado = ?, codigo_postal = ? WHERE id_usuario = ?',
      [calle, numero, ciudad, estado, codigo_postal, id],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error al actualizar dirección' });
          }
          res.json({ id_usuario: id, calle, numero, ciudad, estado, codigo_postal });
      }
  );
};



// Obtener redes sociales de un usuario
exports.getUserRRSS = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM RRSS WHERE id_usuario = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener redes sociales' });
      }
      res.json(results);
  });
};

// Añadir red social para un usuario
exports.addUserRRSS = (req, res) => {
  const { id } = req.params;
  const { URL_RRSS, Nombre_RRSS } = req.body;

  db.query(
      'INSERT INTO RRSS (URL_RRSS, id_usuario, Nombre_RRSS) VALUES (?, ?, ?)',
      [URL_RRSS, id, Nombre_RRSS],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error al añadir red social' });
          }
          res.status(201).json({ URL_RRSS, id_usuario: id, Nombre_RRSS });
      }
  );
};

// Eliminar red social de un usuario
exports.deleteUserRRSS = (req, res) => {
  const { id, url } = req.params;
  db.query('DELETE FROM RRSS WHERE URL_RRSS = ? AND id_usuario = ?', [url, id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al eliminar red social' });
      }
      res.status(204).send();
  });
};

// Obtener contactos de un usuario
exports.getUserContacts = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Contactos WHERE ID_usuario = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener contactos' });
      }
      res.json(results);
  });
};

// Añadir contacto para un usuario
exports.addUserContact = (req, res) => {
  const { id } = req.params;
  const { Telefono } = req.body;

  db.query(
      'INSERT INTO Contactos (Telefono, ID_usuario) VALUES (?, ?)',
      [Telefono, id],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error al añadir contacto' });
          }
          res.status(201).json({ Telefono, ID_usuario: id });
      }
  );
};

// Eliminar contacto de un usuario
exports.deleteUserContact = (req, res) => {
  const { id, telefono } = req.params;
  db.query('DELETE FROM Contactos WHERE Telefono = ? AND ID_usuario = ?', [telefono, id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al eliminar contacto' });
      }
      res.status(204).send();
  });
};

exports.changePassword = (req, res) => {
  const userId = req.user.id; // El ID del usuario está disponible a través de la verificación del token
  const { currentPassword, newPassword } = req.body;

  db.query('SELECT * FROM usuarios WHERE id = ?', [userId], (err, results) => {
      if (err || results.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(currentPassword, user.contrasena);

      if (!passwordIsValid) {
          return res.status(401).json({ message: 'Contraseña actual incorrecta' });
      }

      const hashedNewPassword = bcrypt.hashSync(newPassword, 8); // Hasheando la nueva contraseña

      db.query('UPDATE usuarios SET contrasena = ? WHERE id = ?', [hashedNewPassword, userId], (err) => {
          if (err) {
              return res.status(500).json({ error: 'Error al actualizar la contraseña' });
          }
          res.status(200).json({ message: 'Contraseña actualizada con éxito' });
      });
  });
};


