var crypto = require('crypto')
    User = require('../models/users')

module.exports = function(){

	var self = this

	this.genUid = function(service, id){
		
		var hash = crypto.createHash('sha256')
		
		hash.update(service+id);
		return hash.digest('hex')

	}

	this.lookupUser = function(username, callback){
		User.findOne({username: username}, function(err, doc){

			if(err){

				callback(err)
				return
			}

			callback(null, doc)
		})
	}

	this.lookupUid = function(service, id, callback){

		var query

		switch(service){

			case "flickr":
				query = {flickrid: id}
				break

			case "instagram":
				query = {instagramid: id}
				break

			case "soundcloud":
				query = {soundcloudid: id}
				break
				
			case "youtube":
				query = {youtubeid: id}
		}

		User.findOne(query, function(err, doc){
	
			if(err){

				callback(err)
				return
			}
			
			callback(null, doc)
		})
	}
}