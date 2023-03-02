const Meal = require('../models/meals.models');
const Order = require('../models/orders.models');
const Restaurant = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAllOrderByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const ordersByUser = await Order.findAll({
    attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
    where: {
      userId: sessionUser.id,
    },
 
      include:[
        {
          model: Meal,
          attributes:["name"],
          where:{
            status: true,
          },
          include:[
            {
              model: Restaurant,
              attributes:["name"],
              where:{
                status: true,
              }
            }
          ]
        }
      ]
    
  });
  if (!ordersByUser) {
    return next(new AppError('The user in session has no orders available.', 400));
  }
  return res.status(200).json({
    status: 'success',
    message: 'The orders found was successfully',
    ordersByUser,
  });
});

exports.findOrderByIdUser=catchAsync(async(req,res,next)=>{
  const { sessionUser } = req;
  const {id}=req.params
  const ordersByUser = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
    },
  });
  if (!ordersByUser) {
    return next(new AppError('The user in session has no orders available.', 400));
  }
  return res.status(200).json({
    status: 'success',
    message: 'The orders found was successfully',
    ordersByUser,
  });
})

exports.createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;
  const meal = await Meal.findOne({
    where: {
     id: mealId,
    },
  });
  if (!meal) {
    return next(new AppError('There are not meal', 400));
  }

  let totalPrice = meal.price * quantity;

  const order = await Order.create({
    quantity,
    mealId,
    totalPrice,
    userId: sessionUser.id,
  });
  res.status(201).json({
    message: 'The order has been generated succesfully',
    order,
  });
});


exports.updateOrderById = catchAsync(async(req,res,next)=>{
    const {order}=req
  
    await order.update({ status: 'completed' });
    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
    });
})

exports.deleteOrderById=catchAsync(async(req,res,next)=>{
    const {order}=req
  
    await order.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success',
      message: 'Order delete successfully',
    });
})