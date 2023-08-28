const { Restorants } = require("../models/restorant.model");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.restaurantCreate = catchAsync(async (req, res) => {
  await Restorants.create({
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating,
    status: "active",
  });

  res.status(201).json({
    status: "success",
  });
});

exports.restaurantsAll = catchAsync(async (req, res) => {
  const restorants = await Restorants.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: {
      restorants,
    },
  });
});

exports.restaurantFind = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restorant = await Restorants.findOne({ where: { id } });
  if (!restorant) {
    return next(new AppError("restorant not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      restorant,
    },
  });
});

exports.restaurantsUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restorant = await Restorants.findOne({ where: { id } });

  if (!restorant) {
    return next(new AppError("restaurant not found 🙁", 404));
  }

  const result = await restorant.update({
    name: req.body.name,
    address: req.body.address,
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.restaurantsDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const restorant = await Restorants.findOne({ where: { id } });
  restorant.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});