const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Rutas para el usuario
router.get('/', userController.getAllUsers); // Obtener todos los usuarios
//router.post('/', userController.createUser); // Crear un nuevo usuario
router.get('/:id', userController.getUserById); // Obtener usuario por ID
router.put('/:id', userController.updateUser); // Actualizar usuario por ID
router.delete('/:id', userController.deleteUser); // Eliminar usuario por ID

// Rutas para el perfil
router.get('/:id/perfil', verifyToken, userController.getUserProfile); // Obtener perfil de usuario
router.post('/:id/perfil', verifyToken, upload, userController.createUserProfile); // Crear perfil para usuario
router.put('/:id/perfil', verifyToken, upload, userController.updateUserProfile); // Actualizar perfil de usuario
router.put('/:id/change-password', verifyToken, userController.changePassword);

// Rutas para dirección
router.get('/:id/direccion', verifyToken, userController.getUserAddress); // Obtener dirección de usuario
router.post('/:id/direccion', verifyToken, userController.createUserAddress); // Crear dirección para usuario
router.put('/:id/direccion', verifyToken, userController.updateUserAddress); // Actualizar dirección de usuario

// Rutas para redes sociales
router.get('/:id/rrss', verifyToken, userController.getUserRRSS); // Obtener redes sociales de usuario
router.post('/:id/rrss', verifyToken, userController.addUserRRSS); // Añadir red social para usuario
router.delete('/:id/rrss/:url', verifyToken, userController.deleteUserRRSS); // Eliminar red social de usuario

// Rutas para contactos
router.get('/:id/contactos', verifyToken, userController.getUserContacts); // Obtener contactos de usuario
router.post('/:id/contactos', verifyToken, userController.addUserContact); // Añadir contacto para usuario
router.delete('/:id/contactos/:telefono', verifyToken, userController.deleteUserContact); // Eliminar contacto de usuario

module.exports = router;
