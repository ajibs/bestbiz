const Business = require('../models/Business');
const Category = require('../models/Category');


exports.getAllCategories = async () => {
  const data = await Category.find();
  return data.map(element => element.name);
};


exports.extractCategories = (data = '') => {
  return data.split(',');
};


exports.incrementViews = async (item) => {
  item.views += 1;
  await item.save();
};


exports.tieListingtoCategory = async (selectedCategories, listingID) => {
  // TODO: unlink listingID from Category
  if (selectedCategories[0] === '') {
    return;
  }

  selectedCategories.forEach(async (name) => {
    const category = await Category.findOne({ name });
    if (!category.businesses.includes(listingID)) {
      category.businesses.push(listingID);
      category.save();
    }
  });
};


exports.searchDB = async (value) => {
  const results = await Business.find({
    $text: {
      $search: value
    }
  })
    .sort({ created: 'desc' })
    .limit(5);

  return results;
};


// create demo data
exports.seedDB = async (req, res) => {
  const baseData = {
    address: 'lagos, nigeria',
    website: 'https://domain.com',
    email: 'hello@domain.com',
    phone: '+23412345678',
    categories: [
      'software',
      'design',
      'tech',
      'business'
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

  await Category.remove({}, () => {
    baseData.categories.forEach((element) => {
      new Category({ name: element, businesses: [] }).save();
    });
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
};
