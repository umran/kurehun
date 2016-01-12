var crypto = require("crypto")
var request = require('request')

module.exports = function(consumerKey, consumerSecret, redirectUri) {
	
	var self = this
	
	var consumerKey = consumerKey,
	    consumerSecret = consumerSecret,
	    redirectUri = redirectUri,
	    httpVerb = 'GET',
	    requestEndPoint = 'https://www.flickr.com/services/oauth/request_token',
	    accessEndPoint = 'https://www.flickr.com/services/oauth/access_token',
	    authorizeEndPoint = 'https://www.flickr.com/services/oauth/authorize'
	
	this.genRequest = function(token, tokenSecret, verifier){
		var endPoint = requestEndPoint
		var hmacKey = encodeURIComponent(consumerSecret) + '&'
		var params = {}
		
		if(token && tokenSecret && verifier) {
			
			endPoint = accessEndPoint
			hmacKey += encodeURIComponent(tokenSecret)
		
			params.oauth_token = token
			params.oauth_verifier = verifier
		
		}
		
		params.oauth_consumer_key = consumerKey
		params.oauth_signature_method = 'HMAC-SHA1'
		params.oauth_version = '1.0'
		params.oauth_callback = redirectUri
		
		//generate timestamp and nonce
		var timestamp = Date.now().toString(),
		    nonce = crypto.createHash('md5').update(timestamp).digest('hex').substring(0,32)
	
		params.oauth_timestamp = timestamp
		params.oauth_nonce = nonce
		
		//experimental code
		var percentEscapedParams = []
		
		Object.keys(params).forEach(function(key){
			percentEscapedParams[encodeURIComponent(key)] = encodeURIComponent(params[key])
		})
		
		//generate a request signature
		var sortedParams = []

		Object.keys(percentEscapedParams).sort().forEach(function(key){
			sortedParams.push(key + '=' + percentEscapedParams[key])
		})
	
		var paramsString = sortedParams.join('&'),
		    baseString = httpVerb + '&' + encodeURIComponent(endPoint) + '&' + encodeURIComponent(paramsString)
		    signature = crypto.createHmac('SHA1', hmacKey).update(baseString).digest('base64');
	
		paramsString += '&' + encodeURIComponent('oauth_signature') + '=' + encodeURIComponent(signature)
		var requestUrl = endPoint + '?' + paramsString
		
		return requestUrl
		
	}
	
	this.genAuthUrl = function(requestToken){
		var url = authorizeEndPoint + '?' + encodeURIComponent('oauth_token') + '=' + encodeURIComponent(requestToken) + '&' + encodeURIComponent('perms') + '=' + encodeURIComponent('read')
		return url
	}

	this.parseResponse = function(body){
		var constituents = body.split("&"),
		    result = {},
		    keyval
		
		constituents.forEach(function(pair) {
			keyval = pair.split("=")
			result[decodeURIComponent(keyval[0])] = decodeURIComponent(keyval[1])
		})
		
		return result
	}

	this.initAuth = function(callback){
		
		var url = self.genRequest()
		
		request.get(url, function(err, res, body){
			if(err){
				callback({code: 602, message: err})
				return
			}
			
			if(res.statusCode !== 200){
				callback({code: 601, message: 'Bad HTTP Response: ' + res.statusCode})
				return
			}
			
			var result = self.parseResponse(body)
			callback(null, result)
		})
	}
	
	this.exchangeTokens = function(token, tokenSecret, verifier, callback){
		
		var url = self.genRequest(token, tokenSecret, verifier)
		
		request.get(url, function(err, res, body){
			if(err){
				callback({code: 602, message: err})
				return
			}
			
			if(res.statusCode !== 200){
				callback({code: 601, message: 'Bad HTTP Response: ' + res.statusCode})
				return
			}
			
			var result = self.parseResponse(body)
			callback(null, result)
		})
	}
}