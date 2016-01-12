var mongoose = require('mongoose');

var associationSchema = new mongoose.Schema({
	uid: {type: String, unique: true, required: true},
	flickr_id: {type: Array, required: false},
	instagram_id: {type: Array, required: false},
	soundcloud_id: {type: Array, required: false},
	youtube_id: {type: Array, required: false}
});

var Association = mongoose.model('User', associationSchema);

module.exports = Association;