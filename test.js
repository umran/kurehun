var config = require('./config')
var ig = require('instagram-node').instagram()

ig.use({
	client_id: config.ig.ClientId,
	client_secret: config.ig.ClientSecret
})

ig.use({ access_token: '373989785.e8d3c3b.5aa4a45b460a42f8b741b77542270270' })

ig.user_self_feed(function(err, medias, pagination, remaining, limit) {
	if(err){
		console.log(err)
		return;
	}
	
	console.log(medias)
});