const mongoose = require('mongoose');

const etiquetaSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  tecnica: { type: String, required: true },
  estilos: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  id_usuario: { type: Number, required: true },
  medio: { type: String, required: true },
  fecha_publicacion: { type: Date, required: true },
  descripcion: { type: String, required: true },
  puntuacion: { type: Number, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  etiquetas: { type: [etiquetaSchema], required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
