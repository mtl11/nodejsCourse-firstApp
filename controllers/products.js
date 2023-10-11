const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodID = req.params.productId;
  Product.findByID(prodID, (product) => {
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
  const updatedProduct = new Product(
    prodID,
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price
  );
  updatedProduct.save();
  res.redirect('/admin/admin-products');
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const product = new Product(null, title, imageURL, description, price);
  product.save();
  res.redirect("/");
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  const price = req.body.price;
  Cart.deleteProduct(prodId, price);
  res.redirect("/cart");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteProduct(prodId);
  res.redirect("/admin/admin-products");
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

exports.getSingleProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findByID(prodID, (product) => {
    res.render("product-details", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.return404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/" });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByID(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart =>{
    Product.fetchAll(products=>{
      const cartProducts = []
      for (product of products){
        const cartProductData = cart.products.find(prod=>prod.id === product.id)
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render("cart", {
        pageTitle: "You Cart",
        path: "/cart",
        products: cartProducts
      });
    })
  })
  
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
