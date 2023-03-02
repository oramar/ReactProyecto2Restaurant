const { Router } = require('express');
const { findAllMeals, createMeal, findMealById, updateMealById, deleteMealById } = require('../controllers/meal.controller');
const { protect, restrictTo } = require('../middlewares/auth.middlewares');
const {  validateMealByStatusId } = require('../middlewares/meal.middlewares');
const {  validateRestaurantByIdStatus } = require('../middlewares/restaurant.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const { addMealValidation, updateMealValidation } = require('../middlewares/validations.middleware');
const router = Router();

router.get('/',findAllMeals)
router.get('/:id',validateMealByStatusId,findMealById)

router.use(protect);
router.post('/:id',[
  addMealValidation,
    validateRestaurantByIdStatus,
    validateFields,
    restrictTo('admin'),
],
createMeal)

router.patch('/:id',[    
  updateMealValidation,
    validateFields,
    validateMealByStatusId,    
    restrictTo('admin'),
  ],updateMealById)


  router.delete('/:id',[
    validateMealByStatusId, 
    restrictTo('admin'),
  ],deleteMealById)
module.exports = {
  routerMeal: router,
};
