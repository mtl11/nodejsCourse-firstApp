const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodeComplete", "root", "houston11", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;