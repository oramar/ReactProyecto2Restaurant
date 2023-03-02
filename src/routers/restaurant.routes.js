const { Router } = require("express");
const { findAllRestaurants, findRestaurantById, createRestaurant, updateRestaurantById, deleteRestaurantById } = require("../controllers/restaurant.controller");
const { createReview, updateReviewById,deleteReviewById } = require("../controllers/reviewController");
const { protect, restrictTo, protectAccountOwner } = require("../middlewares/auth.middlewares");
const { validateRestaurantById, validateRestaurantByName, validateRestaurantByIdStatus } = require("../middlewares/restaurant.middleware");
const { validateReviewsById,  validateReviewsByRestaurantId, validateReviewsBySessionUser } = require("../middlewares/review.middleware");
const { validIfExistUser } = require("../middlewares/user.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");
const { createRestaurantValidation, updateRestaurantValidation } = require("../middlewares/validations.middleware");

const router = Router()
router.get('/', findAllRestaurants);
router.get('/:id',validateRestaurantById,findRestaurantById)
//Protegemos las rutas de aqui hacia abajo utilizando el archivo auth.meddlewares
router.use(protect);
router.post('/',[
  createRestaurantValidation,
  validateRestaurantByName,
  validateFields,
  restrictTo('admin'),
],createRestaurant)

router.patch('/:id',[
  updateRestaurantValidation,
  validateFields,
  validateRestaurantByName,
  validateRestaurantById,
  restrictTo('admin'),
],updateRestaurantById)

router.delete('/:id',[
  validateRestaurantByIdStatus, 
  restrictTo('admin'),
],deleteRestaurantById)

router.patch('/reviews/:restauranId/:id',
[
  validateReviewsById,
  validIfExistUser,
  protectAccountOwner,
  validateReviewsByRestaurantId,
  validateFields,
  
],
updateReviewById)

router.delete('/reviews/:restauranId/:id',
[
  validateReviewsById,
  validIfExistUser,
  protectAccountOwner,
  validateReviewsByRestaurantId,
  validateFields,
  
],
deleteReviewById)

router.post('/reviews/:id',[
  validateRestaurantById,
  validateFields,
 
],createReview)

module.exports = {
    routerRestaurant: router,
  };