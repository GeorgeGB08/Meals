const { catchAsync } = require("../utils/catchAsync.utils");
const { Meals } = require("../models/meals.model");
const { AppError } = require("../utils/appError.utils");


exports.mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meals.findOne({ where: { id } });
  req.meal = meal;
  // If meal doesn't exist, send error message
  if (!meal) {
    return next(new AppError("not Found meal 😣", 404));
  }

  // req.anyPropName = 'anyValue'
  req.meal = meal;
  next();
});