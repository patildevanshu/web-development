const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn  , validateReview, isReviewAuthor } = require("../middleware.js");



// review routes
// new routes
router.post("/", validateReview ,isLoggedIn , wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added Successfully!");
    res.redirect(`/listings/${req.params.id}`);
  }));
  
  // delete review route
  router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor ,  wrapAsync(async (req, res) =>{
    let { id , reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id ,{ $pull :{review : reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted Successfully!");
    res.redirect(`/listings/${id}`);
    
  }));

  module.exports = router;
