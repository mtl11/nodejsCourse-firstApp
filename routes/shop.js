const express = require('express');
const path = require('path');

const productController = require("../controllers/products")

const router = express.Router();

router.get('/', productController.getIndex);
router.get('/products', productController.getProducts);
router.get('/cart', productController.getCart);
router.get('/orders', productController.getOrders);
router.get('/checkout', productController.getCheckout);

module.exports = router;