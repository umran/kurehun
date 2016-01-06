var express = require('express')
var router = express.Router()
var passport = require('passport')
var FlickrStrategy = require('passport-flickr').Strategy

module.exports = function(fkConf){

	passport.use(new FlickrStrategy({
	    consumerKey: fkConf.clientId,
	    consumerSecret: fkConf.clientSecret,
	    callbackURL: fkConf.redirectUri,
	    passReqToCallback: true
	  },
	  function(req, token, tokenSecret, profile, done) {
		console.log(req.query)
		done()
	  }
	))

	router.get('/', passport.authenticate('flickr'))

	router.get('/status', passport.authenticate('flickr', {session: false}), function(req, res) {
		res.redirect('/')
	});

	return router
}