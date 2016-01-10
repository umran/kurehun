var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  uid: {type: String, unique: true, required: true},
  flickr: {type: String, required: false},
  instagram: {type: String, required: false}
});

var User = mongoose.model('User', docSchema);

module.exports = User;