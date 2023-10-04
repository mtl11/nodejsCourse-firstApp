const express = require('express');
const path = require('path');

const routeDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) =>{
    // console.log(adminData.products);
    // res.sendFile(path.join(routeDir, 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', {products: products, docTitle: "Shop", path: '/'});
})

module.exports = router;