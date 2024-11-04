const mongoose = require('mongoose');

const etiquetaSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  tecnica: { type: String, required: true },
  estilos: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  id_usuario: { type: Number, required: true },
  nombre_obra: {type: String, required: true},
  artista: { type: String, required: true },
  fecha_publicacion: { type: Date, required: true },
  descripcion: { type: String, required: true },
  dimensiones: {
    altura: { type: Number, required: true },
    anchura: { type: Number, required: true }
  },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  etiquetas: { type: [etiquetaSchema], required: true },
  estado: { type: String, enum: ['disponible', 'vendido'], default: 'disponible' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
