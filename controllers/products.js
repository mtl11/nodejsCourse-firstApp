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
  console.log(req.user);
  const product = new Product(
    title,
    price,
    description,
    imageURL,
    null,
    req.user._id
  )
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/admin-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodID = req.params.productId;
  Product.findById(prodID).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editMode: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productId;
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageURL,
    req.body.productId
  );
  product
    .save()
    .then((result) => {
      res.redirect("/admin/admin-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {});
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/admin-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop", {
        products: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSingleProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findById(prodID)
    .then((product) => {
      res.render("product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.return404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/" });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("cart", {
        pageTitle: "You Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    
    res.render("orders", {
      pageTitle: "Orders",
      path: "/orders",
      orders: orders,
    });
  });
};

// exports.getCheckout = (req, res, next) => {
//   res.render("checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// };

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("index", {
        products: products,
        pageTitle: "Index",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((reuslt) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};
