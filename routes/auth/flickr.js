var express = require('express')
var router = express.Router()
var ExchangeTokens = require("../../api/flickr/src/auth/exchange")
var Utils = require("../../api/flickr/src/utils")
var EventEmitter = require("events").EventEmitter
var flow = new EventEmitter()

module.exports = function(fkConf){
	var authUser = function(req, res){

		if(!req.session.fk_access_token){
			var receivedToken = function(err,body) {
				if(err) {
					console.log(err);
				}

				var options = {}

				var response = Utils.parseRestResponse(body);
				options.user_id = response.user_nsid;
				options.access_token = response.oauth_token;
				options.access_token_secret = response.oauth_token_secret;
				
				console.log('Yay! Access token is ' + options.access_token)
				req.session.fk_access_token = options.access_token
			}
		
			var fk = require('../../api/flickr/src/FlickrApi'),
			    fkOptions = {
				    api_key: fkConf.clientId,
				    secret: fkConf.clientSecret,
				    callback: fkConf.redirectUri
			    }
		
			fk.authenticate(fkOptions, res, function(err, options) {
			
				if(err){
					console.log(err)
					return
				}
			
				flow.on('callback', function(tokens){
					options.oauth_verifier = tokens.oauth_verifier
					new ExchangeTokens(options, receivedToken)
				})
			
			})
		
			return
		}
	
		console.log('Access token already set in session, no need to authenticate again')
		res.send('Flickr Authenticated')
	}

	var handleAuth = function(req, res) {
		flow.emit('callback', req.query)
		res.send('Flickr Authentication Almost Done')
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)

	return router
}