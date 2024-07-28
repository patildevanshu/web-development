const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", " Listing Does Not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.location,
    limit: 1
  }).send();

  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;
  
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

  let originalImageUrl = oldListing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { oldListing , originalImageUrl });
};

module.exports.updateListing = async (req, res) => {

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body, { new: true });

  if( typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = { url, filename };
  await listing.save();
  }

  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted Successfully!");
  res.redirect("/listings");
};
