var config = require('./config')
var ig = require('instagram-node').instagram()

ig.use({
	enforce_signed_requests: true,
	client_id: config.ig.clientId,
	client_secret: config.ig.clientSecret
})

ig.use({ access_token: '373989785.e8d3c3b.5aa4a45b460a42f8b741b77542270270' })

ig.user_self_requested_by(function(err, data, remaining, limit) {
	if(err){
		console.log(err)
		return
	}
	
	console.log(data)
})