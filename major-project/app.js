if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const sessions = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const dbUrl = process.env.ATLASDB_URL;



// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);


main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// session
const store = MongoStore.create({
  mongoUrl : dbUrl ,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter : 24*3600 ,
});

store.on('error', () =>{
  console.error('Failed to connect to MongoDB:' , err);
});


// session
const sessionOptions = {
  store : store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { expires:  Date.now() + 1000* 60 * 60 * 24 * 7 ,
    maxAge: 1000* 60 * 60 * 24 * 7 ,
    httpOnly: true, // HttpOnly flag makes the cookie inaccessible via client-side JavaScript
     
  }, // 1 year
};



app.use(sessions(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// 
app.use((req , res , next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})



// user routes
app.use("/", userRouter);


// listing routes
app.use("/listings", listingRouter);

// Review routes
app.use("/listings/:id/reviews", reviewRouter);


// all routes

app.get("*", (req, res , next) => {
  next(new ExpressError(404 , "page not found"));
});

// Error handler
app.use((err, req, res , next) =>{
  let { statusCode=500 , message="Something Went wrong" } = err;
  res.status(statusCode).render("error.ejs" , { err: err})
  // res.status(statusCode).send(message);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
