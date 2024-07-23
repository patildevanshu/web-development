const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema , reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// validation of Review route data
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(" , ");
      throw new ExpressError(400 , errMsg);
    } else {
      next();
    }
  };


// review routes
// new routes
router.post("/", validateReview , wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    listing.review.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review Added Successfully!");
    res.redirect(`/listings/${req.params.id}`);
  }));
  
  // delete review route
  router.delete("/:reviewId" ,  wrapAsync(async (req, res) =>{
    let { id , reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id ,{ $pull :{review : reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted Successfully!");
    res.redirect(`/listings/${id}`);
    
  }));

  module.exports = router;
