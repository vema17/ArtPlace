const Product = require('../models/productModel'); 

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
      const { nombre_obra, artista, precio,  } = req.body;

      // Crear el producto en MongoDB
      const newProduct = new Product({ nombre_obra, artista, precio, ...otherFields });
      await newProduct.save();

      // Enviar un mensaje a RabbitMQ usando el canal desde app.locals
      const channel = req.app.locals.channel;
      const message = JSON.stringify({ action: 'product_created', product: newProduct });
      
      channel.publish('marketplace-exchange', 'productToUser', Buffer.from(message));
      console.log(`Mensaje enviado a RabbitMQ: ${message}`);

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

const getFilteredProducts = async (req, res) => {
  try {
    console.log("Consulta de filtros recibida:", req.query); // Verifica los parámetros recibidos

    const { query, categoria, tecnica, estilo, priceMin, alturaMin, alturaMax, anchuraMin, anchuraMax } = req.query;
    const filters = {};

    // Construcción de filtros con mensajes de depuración
    if (query) {
      filters.nombre_obra = { $regex: query, $options: 'i' };
      console.log("Filtro de búsqueda aplicado:", filters.nombre_obra);
    }
    if (categoria) {
      filters['etiquetas.categoria'] = categoria;
      console.log("Filtro de categoría aplicado:", filters['etiquetas.categoria']);
    }
    if (tecnica) {
      filters['etiquetas.tecnica'] = tecnica;
      console.log("Filtro de técnica aplicado:", filters['etiquetas.tecnica']);
    }
    if (estilo) {
      filters['etiquetas.estilo'] = estilo;
      console.log("Filtro de estilo aplicado:", filters['etiquetas.estilo']);
    }
    if (priceMin) {
      filters.precio = { $gte: parseFloat(priceMin) };
      console.log("Filtro de precio aplicado:", filters.precio);
    }

    if (alturaMin || alturaMax) {
      filters['dimensiones.altura'] = {};
      if (alturaMin) filters['dimensiones.altura'].$gte = parseFloat(alturaMin);
      if (alturaMax) filters['dimensiones.altura'].$lte = parseFloat(alturaMax);
      console.log("Filtro de altura aplicado:", filters['dimensiones.altura']);
    }

    if (anchuraMin || anchuraMax) {
      filters['dimensiones.anchura'] = {};
      if (anchuraMin) filters['dimensiones.anchura'].$gte = parseFloat(anchuraMin);
      if (anchuraMax) filters['dimensiones.anchura'].$lte = parseFloat(anchuraMax);
      console.log("Filtro de anchura aplicado:", filters['dimensiones.anchura']);
    }

    console.log("Filtros finales aplicados:", filters);

    const products = await Product.find(filters);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error en getFilteredProducts:", error);
    res.status(500).json({ error: error.message });
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
