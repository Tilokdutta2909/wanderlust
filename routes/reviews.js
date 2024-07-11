const express = require("express");
const router = express.Router({mergeParams:true});
const {reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isloggedin, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js");
// validation for the reviews using joi and middleware

  
//Review Route
//Post Review route
router.post("/",
  isloggedin, 
  validateReview,
  wrapAsync(reviewController.createReview));

//delete review route
router.delete(
  "/:reviewId",
  isloggedin,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);


module.exports = router;