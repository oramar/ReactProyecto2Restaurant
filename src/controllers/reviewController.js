const Restaurant = require('../models/restaurants.models');
const Review = require('../models/reviews.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createReview = catchAsync(async(req,res,next)=>{
    const {restaurant,sessionUser}= req
    const {comment,rating}=req.body
   const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
   })

   res.status(201).json({
    message: 'Review created successfully',
    review,
   })
})

exports.updateReviewById = catchAsync(async(req,res,next)=>{
const {review}=req
const {comment,rating}=req.body
const updateReview = await review.update({   
    comment,
    rating,
})
res.status(200).json({
    message: 'Review updated successfully',
    updateReview,
})

})

exports.deleteReviewById = catchAsync(async(req,res,next)=>{
    const {review}=req
await review.update({status:false})
  res.json({
    status: 'success',
    message: 'The review has been deleted successfully',
  });
})