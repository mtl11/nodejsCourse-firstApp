const express = require("express");
const path = require("path");
const {mongoConnect} = require("./util/database");
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/products');
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res,  next) => {
  User.findById("6536bccd67b62df1c0f8db4f")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRoutes);

app.use(errorController.return404);

mongoConnect(()=>{
  app.listen(3000);
})
