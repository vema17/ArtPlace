const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verify');
//crear otro upload para imagenes de productos

router.get('/all', productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.get('/filtered', productController.getFilteredProducts);
router.post('/agregar', upload , verify, productController.createProduct);
router.put('/update/:id', upload , productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;