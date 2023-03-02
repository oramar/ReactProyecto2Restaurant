const Meal = require("../models/meals.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validateMealById = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const meal = await Meal.findOne({
        where:{
            id
        }
    })
    if(!meal){
        throw new AppError( "meal not found",404);
    }
    req.meal = meal;
    next();
})

exports.validateMealByStatusId = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const meal = await Meal.findOne({
        where:{
            id,
            status:true,
        }
    })
    if(!meal){
        throw new AppError( "meal not found",404);
    }
    req.meal = meal;
    next();
})