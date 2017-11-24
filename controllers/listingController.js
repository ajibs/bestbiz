const Business = require('../models/Business');


exports.showHome = async (req, res) => {
  const listings = await Business.find({})
    .sort({ created: 'desc' })  // sort according to the most recent
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


// TODO: export function to a helpers file
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
    .sort({ created: 'desc' })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    listings
  });
};


// TODO: export function to a helpers file
async function searchDB(value) {
  const results = await Business.find({
    $text: {
      $search: value
    }
  })
    .sort({ created: 'desc' })
    .limit(5);

  return results;
}


exports.getListingsByNameOrDescription = async (req, res) => {
  const listings = await searchDB(req.body.term.toLowerCase());

  if (!listings.length) {
    req.flash('failed', 'Listings not found for that query');
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


exports.searchListings = async (req, res) => {
  const listings = await searchDB(req.query.q.toLowerCase());
  res.json(listings);
};


// TODO: export function to a helpers file
exports.seedDB = async (req, res) => {
  // create demo data
  const baseData = {
    address: 'lagos, nigeria',
    website: 'http://devcenter.co',
    email: 'hello@devcenter.co',
    phone: '+23412345678',
    categories: [
      'software development',
      ' design',
      ' user experience',
      ' business'
    ]
  };
  const companies = [
    { name: 'konga', description: 'buy anything online' },
    { name: 'devcenter', description: 'hire great developers' },
    { name: 'paystack', description: 'simple payments' },
    { name: 'andela', description: 'training world class developers' },
    { name: 'jumia', description: 'best online shopping' },
    { name: 'flutterwave', description: 'powerful payments apis' },
    { name: 'devcenter', description: 'hire great developers' },
    { name: 'devcenter', description: 'hire great developers' }
  ];

  const demo = await companies.map(company => Object.assign({}, baseData, company));

  await Business.remove({}, () => { // empty database then save documents
    demo.forEach((element) => {
      new Business(element).save();
    });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
