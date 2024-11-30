const db = require('../config/db');

// Función para crear una calificación
const postComment = (req, res) => {
  const { userId, productId, score, comment } = req.body;
  db.query(`INSERT INTO ratings (user_id, product_id, score, comment) VALUES (?, ?, ?, ?)`, 
    [userId, productId, score, comment], (err,results) => {
    if (err) {
      res.status(500).json({ message: 'Error al crear calificación', error: err });
    }
    res.status(201).json({ userId, productId, score, comment})
    }
  );
};
  
// Función para actualizar una calificación
const updateComment = (req, res) => {
    const { id } = req.params;
    const { score, comment } = req.body;

    db.query(`UPDATE ratings SET score = ?, comment = ? WHERE id = ?`, [score, comment, id], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error al actualizar calificación', error: err });
      }
      res.status(200).json({ message: 'Calificación actualizada exitosamente' });
    })
};
  
// Función para eliminar una calificación
const deleteComment = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM ratings WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar calificación', error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Calificación no encontrada' });
    }

    res.status(200).json({ message: 'Calificación eliminada exitosamente' });
  });
};


  
// Función para obtener todos los comentarios de todas las calificaciones
const getAllComments = (req, res) => {
  db.query(`SELECT * FROM ratings`, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener comentarios', error: err });
    }
    res.json(results);
  });
};
  
module.exports = {
    postComment,
    updateComment,
    deleteComment,
    getAllComments
};
