var express = require('express')
var router = express.Router()

module.exports = function(fk, fkOptions){

	var authUser = function(req, res){
	
		if(!req.session.fk_access_token){
			fk.authenticate(fkOptions, function(err, flickr){
				if(err){
					console.log(err)
					return
				}
				console.log(flickr)
			})
			return
		}
		
		console.log('Access token already set in session, no need to authenticate again')
		res.send('User Authenticated')
	}
 
	var handleAuth = function(req, res) {
	
		console.log(req.query)
	
	}

	router.get('/', authUser)

	router.get('/status', handleAuth)
	
	return router
}