const fs = require('fs');
const path = require('path');
const multer = require('multer');


// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'frontend/public/uploads/';

    // Verificar si la carpeta 'uploads' existe, si no, crearla
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta si no existe
        console.log(`Carpeta creada en: ${uploadPath}`);
      } else {
        console.log('La carpeta ya existe, no es necesario crearla.');
      }
    } catch (err) {
      console.error('Error al crear la carpeta uploads:', err);
      return cb(err); // Llamar al callback con el error para manejarlo correctamente
    }

    cb(null, uploadPath); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const userId = req.params.id || req.body.userId; // El ID del usuario viene de la solicitud
    const ext = path.extname(file.originalname);
    cb(null, `profile_${userId}${ext}`);
  }
  
});

// Inicializa el middleware
const upload = multer({ storage });

// Exporta el middleware
module.exports = upload.single('profileImageInput'); 
