const Product = require('../models/productModel');
const { getCurrentUserId } = require('../middleware/productConsumer');

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
      const userId = getCurrentUserId(); // Obtiene el ID del usuario actual

      if (!userId) {
          return res.status(401).json({ message: 'No se ha encontrado el ID del usuario. Por favor, inicia sesión.' });
      }

      const { titulo, descripcion, artista, altura, anchura, precio, categoria, estilo, tecnica, imagen } = req.body;

      const newProduct = new Product({
          id_usuario: userId,
          nombre_obra: titulo,
          descripcion,
          artista,
          dimensiones: { altura, anchura },
          precio,
          etiquetas: [{ categoria, estilo, tecnica }],
          imagen,
      });

      await newProduct.save();
      res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ message: 'Error al crear producto', error });
  }
}

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener productos filtrados
const getFilteredProducts = async (req, res) => {
  try {
    const { query, categoria, tecnica, estilo, priceMin, alturaMin, alturaMax, anchuraMin, anchuraMax, page = 1, limit = 10 } = req.query;
    const filters = {};

    // Construcción de filtros basados en el modelo Product
    if (query) filters.nombre_obra = { $regex: query, $options: 'i' }; // búsqueda de texto en el nombre de la obra
    if (categoria) filters['etiquetas.categoria'] = categoria; // filtro por categoría en las etiquetas
    if (tecnica) filters['etiquetas.tecnica'] = tecnica; // filtro por técnica en las etiquetas
    if (estilo) filters['etiquetas.estilos'] = estilo; // filtro por estilo en las etiquetas
    if (priceMin) filters.precio = { $gte: parseFloat(priceMin) }; // precio mínimo

    // Filtrado por dimensiones: altura y anchura
    if (alturaMin || alturaMax) {
      filters['dimensiones.altura'] = {};
      if (alturaMin) filters['dimensiones.altura'].$gte = parseFloat(alturaMin);
      if (alturaMax) filters['dimensiones.altura'].$lte = parseFloat(alturaMax);
    }

    if (anchuraMin || anchuraMax) {
      filters['dimensiones.anchura'] = {};
      if (anchuraMin) filters['dimensiones.anchura'].$gte = parseFloat(anchuraMin);
      if (anchuraMax) filters['dimensiones.anchura'].$lte = parseFloat(anchuraMax);
    }

    // Cálculo de paginación
    const skip = (page - 1) * limit;

    const products = await Product.find(filters).skip(skip).limit(parseInt(limit));
    const totalResults = await Product.countDocuments(filters);

    // Respuesta con productos y total de resultados para la paginación
    res.status(200).json({ products, totalResults });
  } catch (error) {
    console.error("Error en getFilteredProducts:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 

// Obtener un producto por su ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
