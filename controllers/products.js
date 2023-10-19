const Product = require("../models/product");
const Cart = require("../models/cart");
const req = require("express/lib/request");
const Order = require("../models/order");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodID = req.params.productId;
  req.user.getProducts({ where: { id: prodID } }).then((products) => {
    const product = products[0];
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
  Product.findByPk(prodID)
    .then((product) => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageURL = req.body.imageURL;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/admin-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageURL: imageURL,
      description: description,
    })
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/admin-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } }).then((products) => {
        const product = products[0];
        return product.cartItem
          .destroy()
          .then((result) => {
            res.redirect("/cart");
          })
          .catch((err) => {});
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(res.redirect("/admin/admin-products"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  req.user
    .getProducts()
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
  Product.findByPk(prodID)
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
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQTY = 1;
      if (product) {
        const oldQTY = product.cartItem.quantity;
        newQTY = oldQTY + 1;
        return fetchedCart
          .addProduct(product, { through: { quantity: newQTY } })
          .then(() => {
            res.redirect("/cart");
          });
      }
      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQTY },
          });
        })
        .then(() => {
          res.redirect("/cart");
        })
        .catch((err) => console.log(err));
    })
    .catch();
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("cart", {
          pageTitle: "You Cart",
          path: "/cart",
          products: products,
        });
      });
    })
    .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']}).then(orders=>{
    res.render("orders", {
      pageTitle: "Orders",
      path: "/orders",
      orders: orders
    });
  })

  // res.render("orders", {
  //   pageTitle: "Orders",
  //   path: "/orders",
  // });
};

exports.getCheckout = (req, res, next) => {
  res.render("checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
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

exports.postOrder = (req, res, next) =>{
  let fetchedCart;
  req.user.getCart().then(cart=>{
    fetchedCart = cart;
    return cart.getProducts();
  }).then(products=>{
    return req.user.createOrder().then(order=>{
      return order.addProducts(products.map(product=>{
        product.orderItem = {quantity: product.cartItem.quantity};
        return product;
      }))
    }).catch(err=>{console.log(err)})
  }).then(reuslt=>{
    return fetchedCart.setProducts(null).then(result=>{
      res.redirect('/orders');
    });
  }).catch(err=>{
    console.log(err)
  })
}
