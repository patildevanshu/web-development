const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.logIn(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }  
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
  };


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back, " + req.user.username);
    let redirectUrl = res.locals.redirectUrl;
    if (!redirectUrl) {
      redirectUrl = "/";
    }
    res.redirect(redirectUrl);
  };

  module.exports.logout =(req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged Out Successfully!");
      res.redirect("/");
    });
  };
