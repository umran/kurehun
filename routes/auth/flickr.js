var express = require('express')
var router = express.Router()
var flickrAuth = require('../../utils/flickr-auth')

module.exports = function(fkConf){

	var fk = new flickrAuth(fkConf.clientId, fkConf.clientSecret, fkConf.redirectUri)

	router.get('/', function(req, res){
		
		if(req.session.hello){
			//Already Authenticated Case (Maybe redirect to logged in page?)
			console.log('Access token already set in session, no need to authenticate again')
			res.redirect('/hello')
			return
		}
		
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
		fk.exchangeTokens(req.query.oauth_token, req.session.fk_oauth_token_secret, req.query.oauth_verifier, function(err, data){
			if(err){
				console.log(err.code + ': ' + err.message)
				res.send('something terrible happened')
				return
			}
			
			//create flickr profile variable in session
			req.session.hello.flickr = {}
			
			//create flickr profile
			var profile = {}
			
			profile.id = data.user_nsid
			profile.username = data.username
			profile.fullname = data.fullname
			profile.access_token = data.oauth_token
			
			//non standard information
			profile.access_token_secret = data.oauth_token_secret
			
			//set profile in session
			req.session.hello.flickr = profile
			
			console.log(data)
			res.redirect('/hello')
		})
		
	})

	return router
}