const { Restorants } = require("./restorant.model");
const { db, DataTypes } = require("../utils/database");

const Meals = db.define("meal", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

// Meals.belongsTo(Restorants, { foreignKey: "restorantId" });

module.exports = { Meals };