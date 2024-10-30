const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/products/';

    // Verificar si la carpeta 'uploads/products' existe; si no, crearla
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta si no existe
        console.log(`Carpeta creada en: ${uploadPath}`);
      } else {
        console.log('La carpeta de productos ya existe, no es necesario crearla.');
      }
    } catch (err) {
      console.error('Error al crear la carpeta uploads/products:', err);
      return cb(err); // Llamar al callback con el error para manejarlo correctamente
    }

    cb(null, uploadPath); // Carpeta donde se guardarán las imágenes de los productos
  },
  filename: (req, file, cb) => {
    const productId = req.params.id || req.body.productId; // El ID del producto viene de la solicitud
    const ext = path.extname(file.originalname);
    cb(null, `product_${productId}${ext}`);
  }
  
});

// Inicializa el middleware
const upload = multer({ storage });

// Exporta el middleware para subir imágenes de productos
module.exports = upload.single('productImageInput'); 
