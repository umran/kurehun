var config = require('./config')
var ig = require('./api/instagram').instagram()
var fk = require('./api/flickr')
var fkConfig {
      api_key: config.api.fk.clientID,
      secret: config.api.fk.clientSecret
    }

ig.use({
	enforce_signed_requests: true,
	client_id: config.api.ig.clientId,
	client_secret: config.api.ig.clientSecret
})

ig.use({ access_token: '373989785.e8d3c3b.5aa4a45b460a42f8b741b77542270270' })

ig.user_media_recent('250934756', function(err, data, remaining, limit) {
	if(err){
		console.log(err)
		return
	}
	
	console.log(data)
})

fkConfig.access_token = ''

fk.authenticate(fkConfig, function(error, flickr) {
  // we can now use "flickr" as our API object
});