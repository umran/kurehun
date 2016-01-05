var express = require('express')
var router = express.Router()
var passport = require('passport')
var FlickrStrategy = require('passport-flickr').Strategy
var EventEmitter = require('events').EventEmitter
var flow = new EventEmitter()

module.exports = function(fkConf){

	passport.use(new FlickrStrategy({
	    consumerKey: fkConf.clientId,
	    consumerSecret: fkConf.clientSecret,
	    callbackURL: fkConf.redirectUri
	  },
	  function(token, tokenSecret, profile, done) {
	  	console.log('fn')
		done(null, token)
	  }
	))

	router.get('/', passport.authenticate('flickr'), function(req, res){
	})

	router.get('/status', passport.authenticate('flickr', {session: false}), function(req, res) {
		// Successful authentication, redirect home.
		console.log('cb')
		res.send(req.session)
	});

	return router
}