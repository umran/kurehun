var flickrAuth = require('./flickrAuth')

var flickr = new flickrAuth('8bb6b5626d269dd7d8553de9f5db6281', '57896e318a0d8498', 'http://localhost:8080/auth/flickr/status')

flickr.initAuth(function(err, body){
	if(err){
		console.log(err.message)
		return
	}
      
      console.log(flickr.genAuthUrl(body.oauth_token))
})