const { Reviews } = require("../models/review.model");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.createReview = catchAsync(async (req, res) => {
  const { restorantId } = req.params;
  const userId = req.sessionUser.id;
  const { rating, comment } = req.body;

  const newReview = await Reviews.create({
    userId, //Must to come from token
    restorantId,
    rating,
    comment,
  });
  res.status(202).json({
    status: "Success",
    data: newReview,
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const { rating, comment } = req.body;

  const { id, restaurantId } = req.params;

  const reviewToUpdate = await Reviews.findOne({
    where: { id, restaurantId: restaurantId },
  });

  exports.updatedReview = await reviewToUpdate.update({ rating, comment });
  res.status(202).json({
    status: "Success",
    data: updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const { id, restorantId } = req.params;
  const ReviewToDelete = await Reviews.findOne({
    where: { id, restaurantId: restorantId },
  });
  await ReviewToDelete.update({ status: "deleted" });
  res.status(202).json({
    status: "Review has been deleted...!!",
  });
});