const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { verifyToken } = require('../middleware/auth'); // Asegúrate de que la ruta sea correcta


router.get('/', userController.getAllUsers); // Obtener todos los usuarios
//router.post('/', userController.createUser); // Crear un nuevo usuario
router.get('/:id', userController.getUserById); // Obtener usuario por ID
router.put('/:id', userController.updateUser); // Actualizar usuario por ID
router.delete('/:id', userController.deleteUser); // Eliminar usuario por ID



router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Rutas para el perfil
router.get('/:id/perfil', userController.getUserProfile); // Obtener perfil de usuario
router.post('/:id/perfil', userController.createUserProfile); // Crear perfil para usuario
router.put('/:id/perfil', userController.updateUserProfile); // Actualizar perfil de usuario

// Rutas para dirección
router.get('/:id/direccion', userController.getUserAddress); // Obtener dirección de usuario
router.post('/:id/direccion', userController.createUserAddress); // Crear dirección para usuario
router.put('/:id/direccion', userController.updateUserAddress); // Actualizar dirección de usuario

// Rutas para redes sociales
router.get('/:id/rrss', userController.getUserRRSS); // Obtener redes sociales de usuario
router.post('/:id/rrss', userController.addUserRRSS); // Añadir red social para usuario
router.delete('/:id/rrss/:url', userController.deleteUserRRSS); // Eliminar red social de usuario

// Rutas para contactos
router.get('/:id/contactos', userController.getUserContacts); // Obtener contactos de usuario
router.post('/:id/contactos', userController.addUserContact); // Añadir contacto para usuario
router.delete('/:id/contactos/:telefono', userController.deleteUserContact); // Eliminar contacto de usuario

module.exports = router;
