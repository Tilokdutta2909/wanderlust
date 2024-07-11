const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveredirectUrl} = require("../middleware.js")
const userController = require("../controllers/user.js");


router.get("/signup", userController.renderSignupPage);

router.post(
  "/signup",
  wrapAsync(userController.userSignup)
);

router.get("/login", userController.renderLoginPage);

router.post(
  "/login",
  saveredirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.userLogin
);

router.get("/logout", userController.userLogOut);

module.exports = router;
