module.exports = {
	
	sessionSecret: 'SESSION_SECRET',
	
	redis: {
		
		host: '127.0.0.1',
		port: 6379,
		
		db: {
			sessions: 0
		}
	},
	
	api: {
		
		instagram: {
			clientId: 'CLIENT_ID',
			clientSecret: 'CLIENT_SECRET',
			redirectUri: 'REDIRECT_URI'
		}
		
		flickr: {
			clientId: 'CLIENT_ID',
			clientSecret: 'CLIENT_SECRET'
		}
		
		soundcloud: {
			clientId: 'CLIENT_ID',
			clientSecret: 'CLIENT_SECRET'
		}
		
		youtube: {
			clientId: 'CLIENT_ID',
			clientSecret: 'CLIENT_SECRET'
		}
	}

}