var express = require('express')
var router = express.Router()
var auth = require('social-oauth-client');

module.exports = function(fk, fkConf){

	var flickr = new auth.Flickr({"CONSUMER_KEY": fkConf.clientId, "CONSUMER_SECRET": fkConf.clientSecret, "REDIRECT_URL": fkConf.redirectUri});

	var authUser = function(req, res){
	
		if(!req.session.fk_access_token){
			
			var url = flickr.getAuthorizeUrl().then(function(o){
				res.redirect(o.url)
			}, function(err) {
				res.send(err)
			})
			
			return
		}
		
		console.log('Access token already set in session, no need to authenticate again')
		res.send('Flickr Authenticated')
	}
 
	var handleAuth = function(req, res) {
		flickr.callback(req, res).then(function(user) {
			// oauth token & user basic info will be shown 
			res.send(user)
		}, function(err) {
			res.send(err)
		})
	
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}