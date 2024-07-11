const User = require("../models/user.js");



module.exports.renderSignupPage = (req, res) => {
    res.render("users/signup.ejs");
  }

module.exports.userSignup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const resuser = await User.register(newUser, password);
      req.flash("success", "User Registered");
      console.log(resuser);
      req.login(resuser,(err) => {
        if(err){
          next(err);
        }
        req.flash("success","Welcome to wanderlust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.renderLoginPage = (req, res) => {
    res.render("users/login.ejs");
  }

module.exports.userLogin = async (req, res) => {
    req.flash("success", "Welcome back to wanderlust !!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect("/listings");
  }

module.exports.userLogOut = (req,res,next) => {
    req.logout((err)=>{
      if(err){
        next(err);
      }
      req.flash("error", "You are logged out!");
      res.redirect("/listings");
    })
  }