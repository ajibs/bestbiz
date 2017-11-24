const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    }
  }
});


/**
 * methods
 */

// generate a hash
userSchema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);
