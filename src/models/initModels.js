const Meal = require( "./meals.models");
const Order = require( "./orders.models");
const Restaurant = require("./restaurants.models")
const Review = require( "./reviews.models");
const User = require( "./users.models");

const initModel=()=>{
    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant);

    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);

    Meal.hasOne(Order);
    Order.belongsTo(Meal);

    User.hasMany(Order);
    Order.belongsTo(User);

    User.hasMany(Review);
    Review.belongsTo(User);
    
}
module.exports = initModel;