var express = require('express')
var router = express.Router()

module.exports = function(ig, redirectUri){

	var authUser = function(req, res) {
		if(!req.session.ig){
			res.redirect(ig.get_authorization_url(redirectUri, { scope: ['public_content', 'follower_list', 'comments', 'relationships', 'likes'], state: 'a state' }))
			return
		}
		
		//Already Authenticated Case (Maybe redirect to logged in page?)
		console.log('Access token already set in session, no need to authenticate again')
		res.send('Instagram Authenticated')
	}
 
	var handleAuth = function(req, res) {
	
		ig.authorize_user(req.query.code, redirectUri, function(err, result) {
			if (err) {
				console.log(err.body)
				res.send('Authentication Failed')
			} else {
				//set access token in session
				var profile = {}
				profile.provider = 'instagram'
				profile.id = result.user.id
				profile.displayName = result.user.username
				profile.fullName = result.user.full_name
				profile.accessToken
				profile.accessTokenSecret = ''
				
				req.session.ig = profile
				console.log(result)
				res.send('Instagram Authenticated')
			}
		})
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}