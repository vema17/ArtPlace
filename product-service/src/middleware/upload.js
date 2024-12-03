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
    // Sanitiza el nombre de la obra y del artista para evitar caracteres especiales en el nombre del archivo
    const nombreObra = req.body.nombre_obra ? req.body.nombre_obra.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'obra';
    const artista = req.body.artista ? req.body.artista.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'artista';
    const timestamp = Date.now(); // Marca de tiempo para asegurar que el nombre sea único
    const ext = path.extname(file.originalname); // Obtener la extensión original del archivo

    // Crear el nombre del archivo combinando la obra, el artista y la fecha
    const filename = `${nombreObra}-${artista}-${timestamp}${ext}`;
    cb(null, filename); // Guardar con el nombre generado
  }
});

// Inicializa el middleware
const upload = multer({ storage });

// Exporta el middleware para subir imágenes de productos
module.exports = upload.single('productImageInput'); 
