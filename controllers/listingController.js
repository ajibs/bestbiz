const Business = require('../models/Business');


exports.showHome = async (req, res) => {
  const listings = await Business.find({})
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(6);

  res.render('index', {
    title: 'Home',
    listings
  });
};


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


exports.showSingleListing = async (req, res) => {
  const listing = await Business.findOne({ _id: req.params.id });

  if (!listing) {
    req.flash('failed', 'Error! listing not found');
    res.redirect('back');
    return;
  }

  res.render('listing-details', {
    title: 'Listing Details',
    listing
  });
};


exports.showExplore = async (req, res) => {
  const listings = await Business.find({})
    .sort({ _id: -1 })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    listings
  });
};


exports.searchListings = async (req, res) => {
  const query = req.body.query.toLowerCase();
  const name = query;
  let listings = await Business.find({ name });

  if (!listings.length) {
    // TODO: improve description search algorithm
    const description = query;
    listings = await Business.find({ description });

    if (!listings.length) {
      req.flash('failed', 'Listings not found for that query');
      res.redirect('back');
      return;
    }
  }

  res.render('explore', {
    title: 'Explore',
    listings
  });
};


exports.seedDB = async (req, res) => {
  // create demo data
  const demo = {
    name: 'devcenter',
    address: 'lagos, nigeria',
    description: 'hire a verified african software developer',
    website: 'http://devcenter.co',
    email: 'hello@devcenter.co',
    phone: '+23412345678',
    categories: [
      'software development',
      'design',
      'user Business'
    ]
  };

  Business.remove({}, () => { // empty database then save documents
    let i = 0;
    while (i < 25) {
      const listing = new Business(demo);
      listing.save();
      i++;
    }
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
