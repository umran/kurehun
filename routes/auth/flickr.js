var express = require('express')
var router = express.Router()
var flickrAuth = require('../../tests/flickrAuth')

module.exports = function(fkConf){

	var fk = new flickrAuth(fkConf.clientId, fkConf.clientSecret, fkConf.redirectUri)

	router.get('/', function(req, res){
		
		//initiate OAuth
		fk.initAuth(function(err, data){
			if(err){
				console.log(err.code + ': ' + err.message)
				res.send('something terrible happened')
				return
			}
			
			//set intermediate token secret in session store
			req.session.fk_oauth_token_secret = data.oauth_token_secret
			
			//redirect to flickr
			res.redirect(fk.genAuthUrl(data.oauth_token))
		})
	})

	router.get('/status', function(req, res){
		
		if(!req.session.fk_oauth_token_secret){
			res.send('Authentication Failed')
			return
		}
		
		if(!req.query.oauth_token || !req.query.oauth_verifier){
			res.send('Authentication Failed')
			return
		}
		
		//exchange intermediate tokens for access tokens
		fk.exchangeTokens(req.query.oauth_token, req.session.fk_oauth_token_secret, req.query.oauth_verifier, function(req, data){
			if(err){
				console.log(err.code + ': ' + err.message)
				res.send('something terrible happened')
				return
			}
			
			console.log(data)
			res.send('Flickr Authenticated')
		})
		
	})

	return router
}