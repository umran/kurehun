var config = require('../config')
var ig = require('../api/instagram').instagram()

ig.use({
	enforce_signed_requests: true,
	client_id: config.api.instagram.clientId,
	client_secret: config.api.instagram.clientSecret
})

ig.use({ access_token: '373989785.e8d3c3b.5aa4a45b460a42f8b741b77542270270' })

ig.user_media_recent('373989785', function(err, data, remaining, limit) {
	if(err){
		console.log(err)
		return
	}
	
	console.log(data[0])
})

ig.user_media_recent('373989785', function(err, data, remaining, limit) {
	if(err){
		console.log(err)
		return
	}
	
	console.log(data[0])
})