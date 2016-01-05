var express = require('express')
var router = express.Router()

module.exports = function(fk, fkOptions){

	var authUser = function(req, res){
	
		if(!req.session.fk_access_token){
			
			fk.authenticate(fkOptions, function(err, flickr) {
				
				
			})
			
			return
		}
		
		console.log('Access token already set in session, no need to authenticate again')
		res.send('Flickr Authenticated')
	}

	var handleAuth = function(req, res) {
		console.log('handler is being called')
		fkOptions.exchange(req.query)
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}