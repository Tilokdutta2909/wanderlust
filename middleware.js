const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema } = require("./schema.js");


module.exports.isloggedin = (req,res,next) =>{
    req.session.redirectUrl = req.originalUrl;
    console.log(req.body);
    if(!req.isAuthenticated()){
        req.flash("error","you have to be logged in to do this !!");
        res.redirect("/login");
    }
    // res.redirect("/lisitngs");
    next();

}

module.exports.saveredirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errmsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errmsg);
    } else {
      next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errmsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errmsg);
    } else {
      next();
    }
  };

  module.exports.isReviewAuthor = async (req,res,next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(res.locals.currUser && !review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
}
