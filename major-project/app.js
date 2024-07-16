const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New route
app.get("/listings/new" , (req , res) =>{
  res.render("listings/new.ejs");
});

// Save new route
app.post("/listings", async (req, res) =>{
  let newListing = new Listing(req.body);
  await newListing.save();
  res.redirect("/listings");
});

// Delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// Show routes
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Edit route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let oldListing = await Listing.findById(id);
  res.render("listings/edit.ejs", { oldListing });
});

// update routes
app.put("/listings/:id", async (req, res) =>{
  let { id } = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect(`/listings/${id}`);
});


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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
