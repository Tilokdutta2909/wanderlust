const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isloggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
//validation for the listings using joi and middleware

//Cleaning up the messy code by using router.route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//Index Route
// router;

//new route
router.get("/new", isloggedin, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListings));

//CREATE ROUTE
// router;

//edit route
router.get(
  "/:id/edit",
  isloggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//UPDATE ROUTE
router.put(
  "/:id",
  upload.single("listing[image]"),
  validateListing,
  isOwner,
  wrapAsync(listingController.updateListing)
);

//DELETE ROUTE
router.delete(
  "/:id",
  isloggedin,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

// search location route
router.post("/search/location", wrapAsync(listingController.searchLocation));
module.exports = router;
