const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require("../controllers/products");

router.get('/add-product', productController.getAddProduct);

// router.get('/products', productController.getAddProduct);
router.get('/admin-products', productController.getAdminProducts);

router.post('/add-product',productController.postAddProduct);

// exports.getAddProduct = (req, res, next) => {
//     res.render("admin-products", {
//       pageTitle: "Add Product",
//       path: "/admin/add-product",
//     });
//   };

module.exports = router;
