var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	flickrid: {type: String, unique: true, required: false},
	instagramid: {type: String, unique: true, required: false},
	soundcloudid: {type: String, unique: true, required: false},
	youtubeid: {type: String, unique: true, required: false},
	username: {type: String, unique: true, required: true},
	password: {type: String, unique: false, required: false},
	flickr: {type: Array, required: false},
	instagram: {type: Array, required: false},
	soundcloud: {type: Array, required: false},
	youtube: {type: Array, required: false}
})

var User = mongoose.model('User', userSchema)

module.exports = User