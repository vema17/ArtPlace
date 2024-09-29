const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Definir las rutas para el CRUD
router.get('/usuarios', userController.getAllUsers);         // Obtener todos los usuarios
//router.post('/usuarios', userController.createUser);         // Crear un nuevo usuario
router.get('/usuarios/:id', userController.getUserById);     // Obtener un usuario por ID
router.put('/usuarios/:id', userController.updateUser);      // Actualizar un usuario por ID
router.delete('/usuarios/:id', userController.deleteUser);   // Eliminar un usuario por ID

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/change-password/:id', userController.changePassword);

module.exports = router;
