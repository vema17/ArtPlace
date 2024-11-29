const db = require('../config/db');

// Función para crear una calificación
const postComment = async (req, res) => {
    const { userId, productId, score, comment } = req.body;
    const query = `
      INSERT INTO ratings (user_id, product_id, score, comment)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const [results] = await db.promise().query(query, [userId, productId, score, comment]);
      res.status(201).json({ message: 'Calificación creada', result: results });
    } catch (err) {
      res.status(500).json({ message: 'Error al crear calificación', error: err });
    }
  };
  
// Función para actualizar una calificación
const updateComment = async (req, res) => {
    const { ratingId } = req.params;
    const { score, comment } = req.body;
    const query = `
      UPDATE ratings
      SET score = ?, comment = ?
      WHERE id = ?
    `;
    try {
      const [results] = await db.promise().query(query, [score, comment, ratingId]);
      res.status(200).json({ message: 'Calificación actualizada', result: results });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar calificación', error: err });
    }
};
  
// Función para eliminar una calificación
const deleteComment = async (req, res) => {
    const { ratingId } = req.params;
    const query = 'DELETE FROM ratings WHERE id = ?';
    try {
      const [results] = await db.promise().query(query, [ratingId]);
      res.status(200).json({ message: 'Calificación eliminada', result: results });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar calificación', error: err });
    }
};
  
// Función para obtener todos los comentarios de todas las calificaciones
const getAllComments = async (req, res) => {
    const query = 'SELECT * FROM ratings';
    try {
      const [results] = await db.promise().query(query);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener comentarios', error: err });
    }
};
  
module.exports = {
    postComment,
    updateComment,
    deleteComment,
    getAllComments
};
