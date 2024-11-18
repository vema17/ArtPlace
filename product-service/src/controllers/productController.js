const Product = require('../models/productModel');
const { getCurrentUserId, getCurrentUserName } = require('../consumers/productConsumer');

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
      const userId = getCurrentUserId();
      const userName = getCurrentUserName();

      if (!userId) {
          return res.status(401).json({ message: 'No autorizado. Por favor, inicia sesión.' });
      }

      // Asegúrate de tomar solo el primer valor de cada campo si vienen como arrays
      const nombre_obra = Array.isArray(req.body.nombre_obra) ? req.body.nombre_obra[0] : req.body.nombre_obra;
      const descripcion = Array.isArray(req.body.descripcion) ? req.body.descripcion[0] : req.body.descripcion;
      const altura = Array.isArray(req.body.altura) ? req.body.altura[0] : req.body.altura;
      const anchura = Array.isArray(req.body.anchura) ? req.body.anchura[0] : req.body.anchura;
      const precio = Array.isArray(req.body.precio) ? req.body.precio[0] : req.body.precio;
      const categoria = Array.isArray(req.body.categoria) ? req.body.categoria[0] : req.body.categoria;
      const estilos = Array.isArray(req.body.estilos) ? req.body.estilos[0] : req.body.estilos;
      const tecnica = Array.isArray(req.body.tecnica) ? req.body.tecnica[0] : req.body.tecnica;

      if (!nombre_obra || !descripcion || !altura || !anchura || !precio || !categoria || !tecnica || !estilos) {
          return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      if (!req.file) {
          return res.status(400).json({ message: 'No se subió ninguna imagen.' });
      }

      const imagenPath = req.file.path;

      const newProduct = new Product({
          id_usuario: userId,
          nombre_obra,
          descripcion,
          artista: userName,
          fecha_publicacion: Date.now(),
          dimensiones: { altura: parseFloat(altura), anchura: parseFloat(anchura) },
          precio: parseFloat(precio),
          imagen: imagenPath,
          etiquetas: [{ categoria, tecnica, estilos }],
          estado: 'disponible'
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
    const { query, categoria, tecnica, estilo, priceMin, alturaMin, alturaMax, anchuraMin, anchuraMax, orderBy, page = 1, limit = 10 } = req.query;
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

    const sort = {};
    if (orderBy === 'asc') sort.precio = 1;  // Orden ascendente
    if (orderBy === 'desc') sort.precio = -1;  // Orden descendente

    // Cálculo de paginación
    // const skip = (page - 1) * limit;
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
      sort,
    };

    // const products = await Product.find(filters).skip(skip).limit(parseInt(limit));
    const products = await Product.find(filters, null, options);
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
      console.error("Error en getProductById:", error);
      res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
      const userId = getCurrentUserId(); // Obtener el ID del usuario actual

      if (!userId) {
          return res.status(401).json({ message: 'No autorizado. Por favor, inicia sesión.' });
      }

      const productId = req.params.id;

      // Asegúrate de tomar solo el primer valor de cada campo si vienen como arrays
      const nombre_obra = Array.isArray(req.body.nombre_obra) ? req.body.nombre_obra[0] : req.body.nombre_obra;
      const descripcion = Array.isArray(req.body.descripcion) ? req.body.descripcion[0] : req.body.descripcion;
      const altura = Array.isArray(req.body.altura) ? req.body.altura[0] : req.body.altura;
      const anchura = Array.isArray(req.body.anchura) ? req.body.anchura[0] : req.body.anchura;
      const precio = Array.isArray(req.body.precio) ? req.body.precio[0] : req.body.precio;
      const categoria = Array.isArray(req.body.categoria) ? req.body.categoria[0] : req.body.categoria;
      const estilos = Array.isArray(req.body.estilo) ? req.body.estilo[0] : req.body.estilo;
      const tecnica = Array.isArray(req.body.tecnica) ? req.body.tecnica[0] : req.body.tecnica;

      if (!nombre_obra || !descripcion || !altura || !anchura || !precio || !categoria || !tecnica || !estilos) {
          return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      const updatedData = {
          nombre_obra,
          descripcion,
          dimensiones: {
              altura: parseFloat(altura),
              anchura: parseFloat(anchura),
          },
          precio: parseFloat(precio),
          etiquetas: {
              categoria,
              estilos,
              tecnica,
          },
      };

      // Si hay una nueva imagen, actualízala
      if (req.file) {
          updatedData.imagen = req.file.path;
      }

      // Actualizar el producto en la base de datos
      const updatedProduct = await Product.findOneAndUpdate(
          { _id: productId, id_usuario: userId }, // Asegúrate de que el producto pertenece al usuario actual
          updatedData,
          { new: true } // Devolver el producto actualizado
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Producto no encontrado o no autorizado para editarlo.' });
      }

      res.status(200).json({ message: 'Producto actualizado exitosamente.', product: updatedProduct });
  } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error interno del servidor.', error });
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

const getProductsByUserId = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado
    const id_usuario = getCurrentUserId();

    if (!id_usuario) {
      return res.status(401).json({ message: 'No autorizado. Por favor, inicia sesión.' });
    }

    // Filtrar productos por el usuario autenticado
    const products = await Product.find({ id_usuario });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para este usuario.' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error al obtener productos del usuario autenticado:', error);
    res.status(500).json({ message: 'Error interno del servidor.', error });
  }
};

const getCurrentUser = (req, res) => {
  try {
    const nombre = getCurrentUserName();

    if (!nombre) {
      return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    res.status(200).json({ nombre });
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    res.status(500).json({ message: 'Error interno del servidor.', error });
  }
};

module.exports = {
  createProduct,
  getCurrentUser,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getProductsByUserId,
  updateProduct,
  deleteProduct
};
