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
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      // Encuentra productos y aplica paginación
      const products = await Product.find().skip(parseInt(skip)).limit(parseInt(limit));
      const totalProducts = await Product.countDocuments(); // Total para la paginación

      res.json({ products, totalProducts });
  } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ message: 'Error al obtener productos' });
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
  getProductById,
  updateProduct,
  deleteProduct
};
