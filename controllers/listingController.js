const Business = require('../models/Business');
const Category = require('../models/Category');


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
  const allCategories = await Category.find();
  const choices = allCategories.map(element => element.name);
  res.render('editListing', {
    title: 'Create Listing',
    listing: {},
    choices
  });
};


// TODO: export function to a helpers file
function extractCategories(data) {
  return data.split(',');
}


exports.addNewListing = async (req, res) => {
  req.body.categories = extractCategories(req.body.categories);
  const listing = await (new Business(req.body)).save();

  req.flash('success', `Successfully created <strong class="text-capitalize">${listing.name}</strong>`);
  res.redirect(`/listing/${listing._id}`);
};


// TODO: get listing by slug
exports.showSingleListing = async (req, res) => {
  const listing = await Business.findOne({ _id: req.params.id });

  if (!listing) {
    req.flash('failed', 'Error! listing not found');
    res.redirect('back');
    return;
  }

  if (!req.user) {
    listing.views += 1;
    await listing.save();
  }

  res.render('listingDetails', {
    title: 'Listing Details',
    listing
  });
};


exports.editListing = async (req, res) => {
  const listing = await Business.findOne({ _id: req.params.id });
  const allCategories = await Category.find();
  const choices = allCategories.map(element => element.name);

  res.render('editListing', {
    title: `Edit ${listing.name}`,
    listing,
    choices
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
    req.flash('failed', `Listings not found for '${req.body.term}'`);
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


exports.deleteListing = async (req, res) => {
  await Business.deleteOne({ _id: req.body.id });
  req.flash('success', 'Successfully deleted listing');
  res.redirect('/dashboard');
};


exports.categories = async (req, res) => {
  const allCategories = await Category.find();
  res.render('categories', {
    title: 'Categories',
    allCategories
  });
};


exports.createCategory = async (req, res) => {
  const name = req.body.category;
  const exists = await Category.findOne({ name });

  if (exists) {
    req.flash('failed', 'Category exists!');
    res.redirect('back');
    return;
  }

  await (new Category({ name, listings: [] })).save();
  req.flash('success', `<strong>${name}</strong> added to categories`);
  res.redirect('/categories');
};


// TODO: export function to a helpers file
// create demo data
exports.seedDB = async (req, res) => {
  const baseData = {
    address: 'lagos, nigeria',
    website: 'https://domain.com',
    email: 'hello@domain.com',
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
    { name: 'hotels.ng', description: 'book hotels in nigeria' },
    { name: 'booking.com', description: 'largest hotel booking website' }
  ];

  const demo = await companies.map(company => Object.assign({}, baseData, company));

  await Business.remove({}, () => {
    demo.forEach((element) => {
      new Business(element).save();
    });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
