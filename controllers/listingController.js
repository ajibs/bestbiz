const Business = require('../models/Business');

exports.showListingForm = (req, res) => {
  res.render('create-listing', {
    title: 'Create Listing'
  });
};


exports.addNewListing = async (req, res) => {
  const listing = new Business(req.body);
  await listing.save();

  req.flash('success', 'Listing Created Successfully');
  res.redirect('/profile');
};
