var express = require('express')
var router = express.Router()
var OAuth = require("oauth").OAuth;

module.exports = function(fk, fkConf){

	var authUser = function(req, res){
	
		if(!req.session.fk_access_token){
			//Do OAuth
			var oauth = new OAuth("https://www.flickr.com/services/oauth/request_token", "https://www.flickr.com/services/oauth/access_token", fkConf.clientId, fkConf.clientSecret, "1.0A", fkConf.redirectUri, "HMAC-SHA1");
			oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret,  results){
				if(err){
					console.log(err)
					return
				}
				oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, function(err, oauth_access_token, oauth_access_token_secret, results){
					if(err){
						console.log(err)
						return
					}
					console.log('Yay! Flickr Access Token is '+ oauth_access_token)
					req.session.fk_access_token = oauth_access_token
				})
			})
			
			return
		}
		
		console.log('Access token already set in session, no need to authenticate again')
		res.send('User Authenticated')
	}
 
	var handleAuth = function(req, res) {
		if(req.session.fk_access_token){
			res.send('Flickr Authenticated')
			return
		}
		res.send('Flickr still not authenticated for some reason')
	
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}