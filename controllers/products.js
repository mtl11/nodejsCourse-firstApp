const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const product = new Product(title, imageURL, description, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { products: products, pageTitle: "Shop", path: "/" });
  });
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    });
  };

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      products: products,
      pageTitle: "Admin Products",
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
exports.getOrders = (req, res, next) => {
  res.render("orders", {
    pageTitle: "Orders",
    path: "/orders",
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
      pageTitle: "Index",
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
