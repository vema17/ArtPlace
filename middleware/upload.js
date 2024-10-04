const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrate de que este directorio exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
});

// Inicializa el middleware
const upload = multer({ storage });

// Exporta el middleware
module.exports = upload.single('profileImage'); // 'profileImage' debe coincidir con el nombre del campo en el formulario
