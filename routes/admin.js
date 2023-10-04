const express = require('express');
const router = express.Router();
const path = require('path');

const routeDir = require('../util/path');

const products = [];

router.get('/add-product', (req, res, next) =>{
    // res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res, next) =>{
    console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/')    
});

exports.routes = router;
exports.products = products;