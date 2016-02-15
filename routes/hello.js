var express = require('express')
var router = express.Router()

/* Logged in endpoint. */
router.get('/', function(req, res, next) {
	if(!req.session.hello){
		res.redirect('/')
		return
	}
	
	var profiles = req.session.hello,
	    username = profiles.instagram.username,
	    profile_picture = profiles.instagram.profile_picture
	
	res.render('hello', { title: 'Kurehun', page: 'hello', profile: { username: username, profile_picture: profile_picture } })
	
})

module.exports = router
