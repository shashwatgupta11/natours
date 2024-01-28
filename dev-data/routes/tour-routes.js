const express = require('express');

const router = express.Router();
const tourController = require('../../controllers/tourController');
const authController = require('../../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes')


// router.param('id', tourController.checkId); //PARAM MIDDLEWARE

router.use('/:tourId/reviews', reviewRouter)

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAlLTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAlLTours)
  .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour, authController.restrictTo('admin', 'lead-guide'))
  .patch(tourController.deleteTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('user'))


module.exports = router;