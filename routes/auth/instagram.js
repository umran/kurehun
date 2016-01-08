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
		if(req.session.hello){
			//Already Authenticated Case (Maybe redirect to logged in page?)
			console.log('Access token already set in session, no need to authenticate again')
			res.redirect('/hello')	
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
				
				//create instagram profile variable in session
				req.session.hello.instagram = {}
				
				//create instagram profile
				var profile = {}

				profile.id = result.user.id
				profile.username = result.user.username
				profile.fullname = result.user.full_name
				profile.access_token = result.access_token
				
				//non standard information
				profile.bio = result.user.bio
				profile.website = result.user.website
				profile.profile_picture = result.user.profile_picture
				
				//set profile in session
				req.session.hello.instagram = profile
				
				console.log(result)
				res.redirect('/hello')
			}
		})
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}