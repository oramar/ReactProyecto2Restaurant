const Meal = require('../models/meals.models');
const Restaurant = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status', 'restaurantId'],
    },
    where: {
      status: true,
    },
    include: {
      model: Restaurant,
      attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    },
  });
  if (meals.length === 0) {
    return next(new AppError('There are not meals in the database.', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'The meals found were successfully',
    meals,
  });
});

exports.findMealById = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;
  const mealId = await Meal.findOne({
    attributes: { exclude: ['status', 'createdAt', 'updatedAt','restaurantId'] },
    where: {
      id,
    },
    include: [
      {
        model: Restaurant,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        where: {
          status: true,
        },
      },
    ],
  });
  return res.status(200).json({
    status: 'success',
    message: 'The meal found was successfully',
    mealId,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, price } = req.body;
  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });
  res.status(200).json({
    status: 'success',
    message: 'The meal was created successfully',
    newMeal,
  });
});

exports.updateMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updateMeal = await meal.update({
    name,
    price,
  });
  res.status(200).json({
    status: 'success',
    message: 'The meal was updated successfully',
    updateMeal,
  });
});

exports.deleteMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: false });
  res.json({
    status: 'success',
    message: 'The meal has been deleted successfully',
  });
});
