const Order = require("../models/orders.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validateOrderByStatusId = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const order = await Order.findOne({
        where:{
            id,
            status:'active',
        }
    })
    if(!order){
        throw new AppError( "order not found or active not",404);
    }
    req.order = order;
    next();
})