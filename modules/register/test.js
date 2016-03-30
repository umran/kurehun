var mongoose = require('./db')
var Reg = require('./register')
var register = new Reg()

console.log('jingo')
register.lookupUid('instagram', '099812304997128782734', function(err,doc){
	if(err){
		console.log('monopopo')
		console.log(err)
		return
	}
	
	if(doc === null){
		console.log('no such record')
	}
})