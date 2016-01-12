# kurehun
Kurehun is a public feed of user generated media (photos, paintings, audio, videos) sourced from instagram, flickr, soundcloud, youtube, etc.
Users sign up, link their social accounts and choose which content will appear in the public feed. In case of flickr, instagram and other services offering PubSubHubbub, the user has the option to set up subscriptions which will allow the service to get push notifications of new content.

### Dependencies
Kurehun currently runs on these dependencies. This list will likely grow to include elasticsearch

* mongodb
* redis

### Installation and Usage

Do the following after cloning into or downloading kurehun

#### Install Package Dependencies

To install dependencies, cd into the application root directory

```js
$ cd /path/to/kurehun
```

then run npm install like so

```js
$ npm install
```

#### Create a configuration file

Copy config.example.js to config.js and open it in a text-editor

```js
$ cp config.example.js config.js
$ nano config.js
```

Then change the file (which follows a basic json structure) to suit your setup

```js
module.exports = {
	
	// this is the secret used to sign and authenticate cookies
	sessionSecret: '',
	
	// this is the hex encoded 16 Byte key used to encrypt user information on disk
	userEncryptionKey: '',
	
	// this is the redis database configuration
	redis: {
		
		host: '127.0.0.1',
		port: 6379,
		
		//db is a list of redis databases, which is denoted by an integer value.
		db: {
		  //this is the database used to store session information
			sessions: 0
		}
	},
	
	// this is the mongodb configuration
	mongodb: {
		
		host: '127.0.0.1',
		port: 2707,
		db: 'kurehun'
	},
	
	// these are the api keys for the instagram, flickr, etc. apps
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
```

Start the application with

```js
$ npm start
```

To run it in debug mode

```js
$ DEBUG=kurehun:* ./bin/www
```
