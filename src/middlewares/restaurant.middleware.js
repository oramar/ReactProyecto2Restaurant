const Restaurant = require("../models/restaurants.models");
const Review = require("../models/reviews.models");
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

exports.validateRestaurantByIdStatus = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const restaurant = await Restaurant.findOne({
        
        where:{
            id,
            status:true,
        }
    })
    if(!restaurant){
        throw new AppError( "Restaurant not found",404);
    }
    req.restaurant = restaurant;
    next();
})

exports.validateRestaurantByName=catchAsync(async(req,res,next)=>{
    const {name} = req.body
    const restaurant = await Restaurant.findOne({
        where:{
            name,
        }
    })
    if(restaurant){
        throw new AppError( "the name restaurant exist",404);
    }
    req.restaurant = restaurant;
    next();
})