const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

router.get('/all', productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.get('/filtered', productController.getFilteredProducts);
router.get('/my-products', productController.getProductsByUserId);
router.get('/current-user', productController.getCurrentUser);
router.post('/agregar', upload , productController.createProduct);
router.put('/update/:id', upload , productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;