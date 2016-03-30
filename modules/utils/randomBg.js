var fs = require('fs')

function getRandIndex() {
  return Math.floor(Math.random() * (1524 - 0)) + 0;
}

function RandomBg(){
	this.array = fs.readFileSync('earthview.txt').toString().split("\n")
}

RandomBg.prototype.newBg = function(){
	var self = this
	var index = getRandIndex()
	return self.array[index]
}

module.exports = RandomBg;