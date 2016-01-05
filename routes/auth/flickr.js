var express = require('express')
var router = express.Router()

module.exports = function(fk, fkOptions){

	var authUser = function(){
	
		if(!req.session.fk_access_token){
			fk.authenticate(fkOptions)
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