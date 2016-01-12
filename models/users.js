var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  uid: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  flickr: {type: Array, required: false},
  instagram: {type: Array, required: false},
  soundcloud: {type: Array, required: false},
  youtube: {type: Array, required: false}
});

var User = mongoose.model('User', userSchema);

module.exports = User;