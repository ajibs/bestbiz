const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a category name!'
  },
  businesses: [String]
});


module.exports = mongoose.model('Category', categorySchema);
