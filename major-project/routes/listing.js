const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner , validateListing } = require("../middleware.js");





// Index route,home page
router.get("/", wrapAsync( async (req, res , next) => {
    const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// New route
router.get("/new" , isLoggedIn ,(req , res) =>{
  res.render("listings/new.ejs");
});

// create Save new route
router.post("/", validateListing ,wrapAsync(async (req, res) =>{
  
  let newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Added Successfully!");
  res.redirect("/listings");
}));

// Delete route
router.delete("/:id", isLoggedIn , isOwner ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted Successfully!");
  res.redirect("/listings");
}));

// Show routes
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({path : "review" , populate : {path : "author"}})
  .populate('owner');
  if (!listing) {
    req.flash("error", " Listing Does Not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

// Edit route

router.get("/:id/edit" ,isLoggedIn , isOwner ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  let oldListing = await Listing.findById(id);
  req.flash("success", " Listing Updated Successfully!");
  if (!oldListing) {
    req.flash("error", " Listing Does Not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { oldListing });
}));

// update routes
router.put("/:id", isLoggedIn , isOwner,validateListing , wrapAsync(async (req, res) =>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect(`/listings/${id}`);
}));


module.exports = router;