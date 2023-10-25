const express = require('express');
const path = require('path');

const productController = require("../controllers/products")

const router = express.Router();

router.get('/', productController.getIndex);
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getSingleProduct);
router.get('/cart', productController.getCart);
router.get('/orders', productController.getOrders);
// // router.get('/checkout', productController.getCheckout);
router.post('/cart-delete-item', productController.postDeleteProductFromCart);
router.post('/cart', productController.postCart);
router.post('/create-order', productController.postOrder);

module.exports = router;