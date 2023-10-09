const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { products: products, docTitle: "Shop", path: "/" });
  });
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("products", {
        products: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    });
  };

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      products: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
exports.return404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
};

exports.getCart = (req, res, next) => {
  res.render("cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("index", {
      products: products,
      docTitle: "Index",
      path: "index",
    });
  });
};
//   exports.getAllProducts = (req, res, next) => {
//     res.render("checkout", {
//       pageTitle: "Checkout",
//       path: "/checkout",
//     });
//   };
