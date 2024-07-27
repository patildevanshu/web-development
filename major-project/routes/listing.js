const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Index route,home page // create Save new route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(validateListing, wrapAsync(listingController.createListing));
  .post(upload.single('image'),(req, res, next) =>{
    res.send(req.file);
  });

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show routes // Delete route  // update routes
router
  .route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .get(wrapAsync(listingController.showListing));

// Edit route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
