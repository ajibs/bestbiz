const Business = require('../models/Business');
const Category = require('../models/Category');
const {
  getAllCategories,
  extractCategories,
  incrementViews,
  tieListingtoCategory,
  searchDB
} = require('./utilityController');


exports.showHome = async (req, res) => {
  const listings = await Business.find({})
    .sort({ created: 'desc' })
    .limit(6);

  res.render('index', {
    title: 'Home',
    listings
  });
};


exports.showListingForm = async (req, res) => {
  const allCategories = await getAllCategories();

  res.render('editListing', {
    title: 'Create Listing',
    listing: {},
    allCategories
  });
};


exports.addNewListing = async (req, res) => {
  req.body.categories = extractCategories(req.body.categories);
  const listing = await (new Business(req.body)).save();

  tieListingtoCategory(listing.categories, String(listing._id));

  req.flash('success', `Successfully created <strong class="text-capitalize">${listing.name}</strong>`);
  res.redirect(`/listing/${listing._id}`);
};


// TODO: get listing by slug
exports.showSingleListing = async (req, res) => {
  const listing = await Business.findOne({ _id: req.params.id });

  if (!listing) {
    req.flash('failed', 'Error! listing NOT found');
    res.redirect('back');
    return;
  }

  if (!req.user) {
    incrementViews(listing);
  }

  res.render('listingDetails', {
    title: 'Listing Details',
    listing
  });
};


exports.showEditListing = async (req, res) => {
  const listing = await Business.findOne({ _id: req.params.id });
  const allCategories = await getAllCategories();

  res.render('editListing', {
    title: `Edit ${listing.name}`,
    listing,
    allCategories
  });
};


exports.updateListing = async (req, res) => {
  req.body.categories = extractCategories(req.body.categories);

  const listing = await Business.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  tieListingtoCategory(listing.categories, String(listing._id));

  req.flash('success', `Successfully updated <strong>${listing.name}</strong>. <a href="/listing/${listing._id}">View Listing</a>`);
  res.redirect(`/listing/${listing._id}/edit`);
};


// TODO: pagination after every 8 listings
exports.showExplore = async (req, res) => {
  const listings = await Business.find({})
    .sort({ created: 'desc' })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    listings
  });
};


exports.getListingsByNameOrDescription = async (req, res) => {
  const listings = await searchDB(req.body.term.toLowerCase());

  if (!listings.length) {
    req.flash('failed', `Listings NOT found for '${req.body.term}'`);
    res.redirect('back');
    return;
  }

  req.flash('success', `Listings found for '${req.body.term}'`);
  res.render('explore', {
    title: 'Explore',
    listings,
    flashes: req.flash()
  });
};


exports.searchListingsAPI = async (req, res) => {
  const listings = await searchDB(req.query.q.toLowerCase());
  res.json(listings);
};


exports.deleteListing = async (req, res) => {
  await Business.deleteOne({ _id: req.body.id });
  req.flash('success', 'Successfully deleted listing');
  res.redirect('/dashboard');
};


exports.showCategories = async (req, res) => {
  const allCategories = await getAllCategories();

  res.render('categories', {
    title: 'Categories',
    allCategories
  });
};


exports.createCategory = async (req, res) => {
  const name = req.body.category.toLowerCase();
  const exists = await Category.findOne({ name });

  if (exists) {
    req.flash('failed', 'Category exists!');
    res.redirect('back');
    return;
  }

  await (new Category({ name, businesses: [] })).save();

  req.flash('success', `<strong>${name}</strong> added to categories`);
  res.redirect('/categories');
};
