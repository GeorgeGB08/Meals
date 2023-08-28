const { Users } = require("../models/users.model");
const { Orders } = require("../models/order.model");
const { Restorants } = require("../models/restorant.model");
const { Meals } = require("../models/meals.model");
const { Reviews } = require("../models/review.model");


const initModels = () => {
  Restorants.hasMany(Reviews, { foreignKey: "restorantId" });
  Reviews.belongsTo(Restorants);

  Restorants.hasMany(Meals, { foreignKey: "restorantId" });
  Meals.belongsTo(Restorants);

  Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals);

  Users.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(Users);

  Users.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(Users);
};

module.exports = { initModels };