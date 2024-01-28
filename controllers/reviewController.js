const Review = require('../models/reviewsModel');
const factory=require('./handlerFactory')


exports.setTourUserIds=(req,res,next)=>{
  //allow mested routes
  if(!req.body.tour) req.body.tour=req.params.tourId
  if(!req.body.user) req.body.user=req.user.id //protect middleware me req.user banaya tha
  next()
}

exports.getAllReview = factory.getAll(Review)
exports.getReview=factory.getOne(Review)
exports.createReview =factory.createOne(Review)
exports.updateReview=factory.updateOne(Review)
exports.deleteReview=factory.deleteOne(Review)
