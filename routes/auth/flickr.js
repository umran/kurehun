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
	  	flow.on('ok', function(){
	  		flow.emit('token', token)
	  	})
		done()
	  }
	))

	router.get('/', passport.authenticate('flickr'), function(req, res){
		
	})

	router.get('/status', passport.authenticate('flickr', {session: false}), function(req, res) {
		// Successful authentication, redirect home.
		flow.on('token', function(token){
			req.session.fk_access_token = token
			res.send(req.session)
		})
		flow.emit('ok')
	});

	return router
}