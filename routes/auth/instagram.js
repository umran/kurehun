var express = require('express')
var router = express.Router()

module.exports = function(ig, redirectUri){

	var authUser = function(req, res) {
		res.redirect(ig.get_authorization_url(redirectUri, { scope: ['likes'], state: 'a state' }))
	}
 
	var handleAuth = function(req, res) {
		ig.authorize_user(req.query.code, redirectUri, function(err, result) {
			if (err) {
				console.log(err.body)
				res.send("Didn't work")
			} else {
				console.log('Yay! Access token is ' + result.access_token)
				res.send('You made it!!')
			}
		})
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}