const http = require("http");
const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) =>{
    console.log("One");
    res.send('<h1>Add Product Pages</h1>');
});

app.use((req, res, next) =>{
    console.log("Two");
    res.send('<h1>Hello From Express!</h1>');
})

const server = http.createServer(app);



server.listen(3000);
