const catchAsync = require('../utils/catchAsync');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
const {user}=req
  const updateUser = await user.update({
    name,
    email,
  });
  res.status(200).json({
    message: 'User updated successfully',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
  
    await user.update({ status: false });
  
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  });