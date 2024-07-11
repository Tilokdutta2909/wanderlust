const Listing = require("../models/listing.js");
// const { listingSchema } = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
  console.log("page is working!!");
};

module.exports.showListings = async (req, res) => {
  
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner")
    .populate("location")
    .populate("geometry");
  if (!listing) {
    req.flash("error", " This listing you searched doesn't exits !!");
    res.redirect("/listings");
  }
  let response  = await geocodingClient.forwardGeocode({
    query: listing.location,
    limit: 1
  })
    .send()
  listing.geometry = response.body.features[0].geometry;

  console.log(listing.owner);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // console.log(result);
  let response  = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send()
  console.log(response.body.features[0].geometry);

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url);
  // console.log(filename);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  console.log(newListing);
  await newListing.save();
  req.flash("success", "new listings created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing.description);
  if (!listing) {
    req.flash("error", " This listing you searched doesn't exits !!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "listings updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "listings deleted");

  res.redirect("/listings");
};

module.exports.searchLocation = (req,res) =>{
  let location = req.body;
  console.log(location);
}