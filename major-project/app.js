const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema } = require("./schema.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// validation of create route data
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(" , ");
    throw new ExpressError(400 , errMsg);
  } else {
    next();
  }
};
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

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Index route,home page
app.get("/listings", wrapAsync( async (req, res , next) => {
    const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// New route
app.get("/listings/new" , (req , res) =>{
  res.render("listings/new.ejs");
});

// create Save new route
app.post("/listings", validateListing ,wrapAsync(async (req, res) =>{
  
  let newListing = new Listing(req.body);
  await newListing.save();
  res.redirect("/listings");
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// Show routes
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("review");
  res.render("listings/show.ejs", { listing });
}));

// Edit route

app.get("/listings/:id/edit" ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  let oldListing = await Listing.findById(id);
  res.render("listings/edit.ejs", { oldListing });
}));

// update routes
app.put("/listings/:id", validateListing , wrapAsync(async (req, res) =>{
  let { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect(`/listings/${id}`);
}));

// review routes

app.post("/listings/:id/reviews", validateReview , wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let review = new Review(req.body.review);
  listing.review.push(review);
  await review.save();
  await listing.save();
  res.redirect(`/listings/${req.params.id}`);
}));


// // testing server
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

// all routes

app.get("*", (req, res , next) => {
  next(new ExpressError(404 , "page not found"));
});

// // testing server


// Error handler
app.use((err, req, res , next) =>{
  let { statusCode=500 , message="Something Went wrong" } = err;
  res.status(statusCode).render("error.ejs" , { err: err})
  // res.status(statusCode).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
