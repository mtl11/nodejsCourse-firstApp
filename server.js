const express = require("express");
const path = require("path");
const { mongoConnect } = require("./util/database");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/products");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65383e646d1fd189af05a98a")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRoutes);

// app.use(errorController.return404);

mongoose
  .connect(
    "mongodb+srv://matthew:houston11@cluster0.ryb3qzs.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
