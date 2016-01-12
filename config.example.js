module.exports = {
	
	sessionSecret: '',
	
	redis: {
		
		host: '127.0.0.1',
		port: 6379,
		
		db: {
			sessions: 0
		}
	},
	
	mongodb: {
		
		host: '127.0.0.1',
		port: 2707,
		db: 'kurehun'
	},
	
	api: {
		
		instagram: {
			clientId: '',
			clientSecret: '',
			redirectUri: ''
		},
		
		flickr: {
			clientId: '',
			clientSecret: '',
			redirectUri: ''
		}
	}

}