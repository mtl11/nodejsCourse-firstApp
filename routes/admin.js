const express = require('express');
const router = express.Router();
const productController = require("../controllers/products");

router.get('/add-product', productController.getAddProduct);

router.get('/admin-products', productController.getAdminProducts);

router.post('/add-product',productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product',productController.postEditProduct);

router.post('/delete-product',productController.postDeleteProduct);

module.exports = router;
