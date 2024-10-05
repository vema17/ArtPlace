const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';

    // Verificar si la carpeta 'uploads' existe, si no, crearla
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta si no existe
    }

    cb(null, uploadPath); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para la imagen
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix); // Guardar la imagen con un nombre único
  }
});

// Inicializa el middleware
const upload = multer({ storage });

// Exporta el middleware
module.exports = upload.single('profileImage'); // 'profileImage' debe coincidir con el nombre del campo en el formulario
