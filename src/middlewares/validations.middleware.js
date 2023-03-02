const { check } = require('express-validator');
const AppError = require('../utils/appError');

//Verificamos que el usuario ingrese la informacion completa para registrar usuario
exports.registerUserValidation = [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];
//Verificamos si el email y password a sido ingresado por el usuario
exports.loginUserValidation = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.updateUserValidation = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
];
//Validamos que el usuario actualice la contraseña correctamente
exports.updatePasswordUserValidation = [
  check('currentPassword', 'The current password must be mandatory')
    .not()
    .isEmpty(),
  check('newPassword', 'The new password must be mandatory').not().isEmpty(),
];
//Validacion para crear restaurantes
exports.createRestaurantValidation = [
  check('name', 'The title is required').not().isEmpty(),
  check('address', 'The description is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isNumeric(),
  check('rating').exists().custom((value,{req})=>{
    if (value >5 || value < 1){
      throw new AppError('you must enter a rating from 1 to 5', 400);
    }
    return true
  }),  
];

exports.updateRestaurantValidation = [
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),  
];

//Validacion para crear restaurantes
exports.createReviewsValidation = [
  check('comment', 'The comment is required').not().isEmpty(),  
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isNumeric(),
  check('rating').exists().custom((value,{req})=>{
    if (value >5 || value < 1){
      throw new AppError('you must enter a rating from 1 to 5', 400);
    }
    return true
  }),  
];

exports.updateReviewsValidation = [
  check('comment', 'The comment is required').not().isEmpty(),  
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isNumeric(),
  check('rating').exists().custom((value,{req})=>{
    if (value >5 || value < 1){
      throw new AppError('you must enter a rating from 1 to 5', 400);
    }
    return true
  }),  
];


exports.addMealValidation = [
  check('comment', 'The comment is required').not().isEmpty(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
];

exports.updateMealValidation = [
  check('comment', 'The comment is required').not().isEmpty(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
];

exports.addOrderValidation = [
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
  check('mealId', 'The quantity is required').not().isEmpty(),
  check('mealId', 'The quantity must be a number').isNumeric(),
];

exports.updateProductToCartValidation = [
  check('productId', 'The producId is required').not().isEmpty(),
  check('productId', 'The producId must be a number').isNumeric(),
  check('newQty', 'The quantity is required').not().isEmpty(),
  check('newQty', 'The quantity must be a number').isNumeric(),
];
