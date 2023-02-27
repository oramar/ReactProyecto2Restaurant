const Restaurant = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//buscar todos los restaurantes con estado activo
exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });

  if(restaurants.length===0){
    return next(new AppError('There are not restaurants in the database.', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'The restaurants found were successfully',
    restaurants,
  });
});

//buscar restaurante por id

exports.findRestaurantById = catchAsync(async(req,res,next)=>{
  const {restaurant}=req
  return res.status(200).json({
    status:'success',
    message: 'The restaurant found was successfully',
    restaurant,
  })
})