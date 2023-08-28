const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  port: 5432,
  database: "mealdb",
  logging: false,
});

module.exports = { db, DataTypes };