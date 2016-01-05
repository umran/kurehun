var express = require('express')
var router = express.Router()
var passport = require('passport')
var FlickrStrategy = require('passport-flickr').Strategy

module.exports = function(fkConf){

	passport.use(new FlickrStrategy({
	    consumerKey: fkConf.clientId,
	    consumerSecret: fkConf.clientSecret,
	    callbackURL: fkConf.redirectUri
	  },
	  function(token, tokenSecret, profile, done) {
	    console.log(token)
	    return done(null, token)
	  }
	));

	var handleAuth = function(req, res) {
		
	}

	router.get('/', passport.authenticate('flickr'));

	router.get('/status', passport.authenticate('flickr', { session: false }), function(req, res) {
		// Successful authentication, redirect home.
		console.log('what?')
	});

	return router
}