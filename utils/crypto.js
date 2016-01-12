var crypto = require('crypto');

module.exports = function(userEncryptionKey) {

	var self = this

	this.algorithm = 'aes-128-gcm'
	this.key = new Buffer(userEncryptionKey, 'hex')

	this.encrypt = function(message, callback) {
		crypto.randomBytes(12, function(ex, nonce) {

			if (ex){
				callback(ex)
				return
			}

			//if no error on nonce generation, do encryption
			var cipher = crypto.createCipheriv(self.algorithm, self.key, nonce),
			    encrypted = cipher.update(message, 'utf8', 'hex')

			encrypted += cipher.final('hex')

			var tag = cipher.getAuthTag()

			callback(null, {
				nonce: nonce.toString('hex'),
				content: encrypted,
				tag: tag.toString('hex')
			})
		})
	}

	this.decrypt = function(ciphertext, callback) {

		var decrypt = crypto.createDecipheriv(self.algorithm, self.key, new Buffer(ciphertext.nonce, 'hex'))
		decrypt.setAuthTag(new Buffer(ciphertext.tag, 'hex'))

		var dec = decrypt.update(ciphertext.content, 'hex', 'utf8')

		try {
			dec += decrypt.final('utf8')
		} catch(ex) {
			callback(ex)
			return
		}

		callback(null, dec)
	}

}