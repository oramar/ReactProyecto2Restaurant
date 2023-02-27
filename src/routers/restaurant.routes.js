const { Router } = require("express");
const { findAllRestaurants, findRestaurantById } = require("../controllers/restaurant.controller");
const { validateRestaurantById } = require("../middlewares/restaurant.middleware");

const router = Router()
router.get('/', findAllRestaurants);
router.get('/:id',validateRestaurantById,findRestaurantById)

module.exports = {
    routerRestaurant: router,
  };