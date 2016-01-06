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
		req.session.fk_access_token = token
		console.log(token)
		done()
	  }
	))

	router.get('/', function(req, res){
		if(req.session.fk_access_token) {
			res.send('Flickr Authenticated')
			return
		}
	}, passport.authenticate('flickr'))

	router.get('/status', passport.authenticate('flickr', {session: false}), function(req, res) {
		res.send('Flickr Authenticated')
	});

	return router
}