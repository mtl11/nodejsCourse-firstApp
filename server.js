const http = require("http");
const express = require('express');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine','ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
const errorController = require('./controllers/products')
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminData);
app.use(shopRoutes);

app.use(errorController.return404);

app.listen(3000);

// module.exports = path.dirname(require.main.filename);

