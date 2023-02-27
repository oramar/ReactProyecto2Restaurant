const Restaurant = require("../models/restaurants.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validateRestaurantById = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const restaurant = await Restaurant.findOne({
        where:{
            id
        }
    })
    if(!restaurant){
        throw new AppError( "Restaurant not found",404);
    }
    req.restaurant = restaurant;
    next();
})