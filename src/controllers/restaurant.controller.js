const Restaurant = require('../models/restaurants.models');
const Review = require('../models/reviews.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//buscar todos los restaurantes con estado activo
exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      status: true,
    },
    include:{
      model: Review,
      attributes: ['id', 'userId', 'comment',"rating"] ,
    }
  });

  if (restaurants.length === 0) {
    return next(
      new AppError('There are not restaurants in the database.', 404)
    );
  }
  res.status(200).json({
    status: 'success',
    message: 'The restaurants found were successfully',
    restaurants,
  });
});

//buscar restaurante por id

exports.findRestaurantById = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      status: true,
    },
    include:{
      model: Review,
      attributes: ['id', 'userId', 'comment',"rating"] ,
    }
  });
  return res.status(200).json({
    status: 'success',
    message: 'The restaurant found was successfully',
    restaurant,
  });
});

//Vamos a crear un restaurante
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;
  const newRestaurant = await Restaurant.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });
  res.status(200).json({
    status: 'success',
    message: 'The restaurant was created successfully',
    newRestaurant,
  });
});

//vamos a actualizar el restaurante
exports.updateRestaurantById = catchAsync(async(req,res,next)=>{
  const {restaurant} = req
  const { name, address} = req.body;

  const updateRestaurant = await restaurant.update({
    name,
    address,
  })
  res.status(200).json({
    status:'success',
    message: 'The restaurant was updated successfully',
    updateRestaurant,
  })
})

//desahabilitar restaurant

exports.deleteRestaurantById = catchAsync(async(req,res,next)=>{
  const {restaurant}=req
  await restaurant.update({
    status: false,
  })
  res.status(200).json({
    status:'success',
    message: 'The restaurant was deleted successfully',
  })
})
