const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, t, imageURL, description, price) {
    this.id = id;
    this.title = t;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductID = products.findIndex(
          (prod) => prod.id == this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductID] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByID(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => (p.id == id));
      cb(product);
    });
  }

  static deleteProduct(id){
    getProductsFromFile((products) => {
      
      const product = products.find((p) => (p.id === id));
      const updatedProducts = products.filter((p) => (p.id !== id));
      console.log(product);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
       if(!err){
        Cart.deleteProduct(id, product.price);
       }
      });
    });
  }
};
