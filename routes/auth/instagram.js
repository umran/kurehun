var express = require('express')
var router = express.Router()

module.exports = function(igConf){

	var ig = require('../../api/instagram').instagram()

	ig.use({
		enforce_signed_requests: true,
		client_id: igConf.clientId,
		client_secret: igConf.clientSecret
	})

	var authUser = function(req, res) {
		if(req.session.ig){
			//Already Authenticated Case (Maybe redirect to logged in page?)
			console.log('Access token already set in session, no need to authenticate again')
			res.send('Instagram Authenticated')	
			return
		}
		
		res.redirect(ig.get_authorization_url(igConf.redirectUri, { scope: ['public_content', 'follower_list', 'comments', 'relationships', 'likes'], state: 'a state' }))
	}
 
	var handleAuth = function(req, res) {
		
		ig.authorize_user(req.query.code, igConf.redirectUri, function(err, result) {
			if (err) {
				console.log(err.body)
				res.send('Authentication Failed')
			} else {
				
				//create instagram profile
				var profile = {}
				
				profile.provider = 'instagram'
				profile.id = result.user.id
				profile.displayName = result.user.username
				profile.fullName = result.user.full_name
				profile.accessToken = result.access_token
				
				//set profile in session
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