const catchAsync = require('../utils/catchAsync.utils');
const Restorant = require('../models/restorant.model');
const AppError = require('../utils/appError.utils');

exports.restaurantExists = catchAsync(async(req, res, next) => {
  const {id, restorantId} = req.params  

  const restorant = await Restorant.findOne({
    where : {
        status: true, 
        id: restorantId || id,
    }
  })
  
   if(restorant) 
   return next(new AppError(`Restorant with id: ${restorantId || id} not found`, 404))
   

   req.restorant = restorant
  next();
});