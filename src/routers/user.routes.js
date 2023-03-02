const { Router } = require("express");
const { findAllOrderByUser, findOrderByIdUser } = require("../controllers/order.controller");
const { updateUser, deleteUser } = require("../controllers/user.controller");
const { protect, protectAccountOwner } = require("../middlewares/auth.middlewares");
const { validIfExistUser } = require("../middlewares/user.middleware");
const { updateUserValidation } = require("../middlewares/validations.middleware");

const router =Router()
router.get('/orders/:id',protect,findOrderByIdUser)
router.get('/orders',protect,findAllOrderByUser)
router.use(protect)
router.patch('/:id',updateUserValidation,validIfExistUser,protectAccountOwner,updateUser)
router.delete('/:id',validIfExistUser,protectAccountOwner,deleteUser)

module.exports={
    routerUser:router
}