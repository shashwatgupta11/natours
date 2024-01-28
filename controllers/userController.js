const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchError');
const factory = require('./handlerFactory')



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes) {
      if (allowedFields.includes(el)) {
        newObj[el] = obj[el];
      }
    }
  });
  return newObj;
};


exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id
  next()
})

exports.updateMe = catchAsync(async (req, res, next) => {
  //1 create error if user posts password data
  console.log(req.body);
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('This route is not for updating passwords', 400));
  }

  const filterBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updateUser
  });
});



exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined , pls use signup instead',
  });
};


exports.getUser = factory.getOne(User)
exports.getAllUsers = factory.getAll(User)
//do not update passwrod kuki save middle ware ni chalega find me
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
