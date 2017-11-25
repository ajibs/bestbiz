const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply a category name!'
  },
  listings: [String]
});


module.exports = mongoose.model('Category', categorySchema);
