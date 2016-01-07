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
			
			//set intermediate tokens in session store
			req.session.fk_oauth_token = data.oauth_token
			req.session.fk_oauth_token_secret = data.oauth_token_secret
			
			//redirect to flickr
			res.redirect(fk.genAuthUrl(req.session.fk_oauth_token))
		})
	})

	router.get('/status', function(req, res){
		console.log(req.query)
		res.send('OK')
	})

	return router
}