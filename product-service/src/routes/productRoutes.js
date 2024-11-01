const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
//crear otro upload para imagenes de productos

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/agregar', upload , productController.createProduct);
router.put('/:id', upload , productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;