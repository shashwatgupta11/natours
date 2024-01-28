const express = require('express');

const router = express.Router();
const userController = require('./../../controllers/userController');
const authController = require('./../../controllers/authController');


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect)
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

//ab is route ke neeche jitne bhi h un sb pe route.protect laga milega

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMe', userController.updateMe)
router.delete('/deleteMe', userController.deleteMe)


router.use(authController.restrictTo('admin'))

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


//nested routes

module.exports = router;
