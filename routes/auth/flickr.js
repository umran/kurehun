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
		profile.access_token = token
		profile.access_token_secret = tokenSecret
		
		//set flickr credentials in session variable
		req.session.fk = profile
		
		console.log(profile)
		done(null, profile)
	  }
	))

	router.get('/', passport.authenticate('flickr'))

	router.get('/status', passport.authenticate('flickr', {failureRedirect: '/', session: false}), function(req, res) {
		req.session.confirm_attempts = 0;
		res.redirect('/auth/flickr/status/confirmation')
	});
	
	//confirmation route
	router.get('/status/confirmation', function(req, res){
		if(!req.session.fk){
			if(req.session.confirm_attempts > 1){
				res.send('FLickr authentication failed for some reason')
				return
			}
			req.session.confirm_attempts+=1
			res.redirect('/auth/flickr/status/confirmation')
			return
			
		}
		res.send('Flickr Authenticated')
	})

	return router
}