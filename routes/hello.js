var express = require('express')
var router = express.Router()

/* Logged in endpoint. */
router.get('/', function(req, res, next) {
	if(!req.session.hello){
		res.redirect('/')
		return
	}
	
	var profiles = req.session.hello,
	    username
	
	if(profiles.flickr){
		username = profiles.flickr.username
	} else {
		username = profiles.instagram.username
	}
	
	res.render('hello', { title: 'Kurehun', bg: 'no-bg-cover', nav: 'Hello ' + username + '!' })
	
})

module.exports = router
