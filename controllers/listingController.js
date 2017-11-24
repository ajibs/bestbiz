const Business = require('../models/Business');


exports.showListingForm = (req, res) => {
  res.render('create-listing', {
    title: 'Create Listing'
  });
};

function extractCategories(data, result) {
  const arrayOptions = data.options.split(',');
  arrayOptions.forEach((item) => {
    result.categories.push(item);
  });

  return result;
}

exports.addNewListing = async (req, res) => {
  const listing = new Business(req.body);
  const formattedListing = extractCategories(req.body, listing);

  await formattedListing.save();

  req.flash('success', 'Listing Created Successfully');
  res.redirect('/profile');
};
