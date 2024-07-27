const Listing = require("../models/listing.js");


module.exports.index = async (req, res , next) => {
    const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req , res) =>{
    res.render("listings/new.ejs");
  };

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "review" , populate : {path : "author"}})
    .populate('owner');
    if (!listing) {
      req.flash("error", " Listing Does Not Exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };

module.exports.createListing = async (req, res) =>{
  
    let newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Added Successfully!");
    res.redirect("/listings");
  };


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let oldListing = await Listing.findById(id);
    req.flash("success", " Listing Updated Successfully!");
    if (!oldListing) {
      req.flash("error", " Listing Does Not Exist!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { oldListing });
  };


module.exports.updateListing = async (req, res) =>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect(`/listings/${id}`);
  };

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted Successfully!");
    res.redirect("/listings");
  };
  
