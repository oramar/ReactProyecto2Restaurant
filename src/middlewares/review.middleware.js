const Restaurant = require("../models/restaurants.models");
const Review = require("../models/reviews.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validateReviewsById = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const review = await Review.findOne({
        where:{
            id
        }
    })
    if(!review){
        throw new AppError( "Review not found",404);
    }
    req.review = review;
    next();
})

exports.validateReviewsBySessionUser = catchAsync(async( req,res,next)=>{
     
    const {  sessionUser}=req;
    const reviewUser = await Review.findOne({
        where:{
            
            userId: sessionUser.id,
        }
    })
    
    if(!reviewUser){
        throw new AppError( "Only the user of the review can modify their review.",404);
    }
    req.reviewUser = reviewUser;
    next();
})

exports.validateReviewsByRestaurantId = catchAsync(async( req,res,next)=>{
     
    const {  restauranId}=req.params;
    const reviewRestaurant = await Review.findOne({
        where:{            
            restaurantId: restauranId,
        }
    })
    
    if(!reviewRestaurant){
        throw new AppError( "the restaurant id does not exist in the review.",404);
    }
    req.reviewRestaurant = reviewRestaurant;
    next();
})