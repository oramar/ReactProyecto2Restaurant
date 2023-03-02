const { Router } = require("express");
const { findAllOrderByUser, createOrder, updateOrderById, deleteOrderById } = require("../controllers/order.controller");
const { protect, protectAccountOwner } = require("../middlewares/auth.middlewares");
const { validateOrderByStatusId } = require("../middlewares/order.middleware");
const {validIfExistUser}=require("../middlewares/user.middleware");
const { addOrderValidation } = require("../middlewares/validations.middleware");

const router =Router()
router.get('/:me',validIfExistUser,findAllOrderByUser)
router.use(protect);
router.post('/',addOrderValidation,createOrder)
router.patch('/:id',[
    validateOrderByStatusId,
    validIfExistUser,
    protectAccountOwner,
],updateOrderById)

router.delete('/:id',validateOrderByStatusId,validIfExistUser,protectAccountOwner,deleteOrderById)
module.exports={
    routerOrder:router
}