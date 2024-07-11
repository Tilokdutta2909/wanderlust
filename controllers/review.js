const {reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");

module.exports.createReview = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    // I have to make sure to create relation between review collection and the listings collection as if I delete one review from the review it didn't get deleted from the listings collection
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
  
    console.log("New review saved.");
    console.log(newReview.comment);
    // res.send("New review Saved.");
    req.flash("success","new review created");
  
    res.redirect(`/listings/${id}`);
  }

module.exports.deleteReview = async(req,res) =>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
  }
  