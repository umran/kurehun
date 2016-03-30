var config = require('../../config').mongodb
    mongoose = require('mongoose')

//connect to mongodb
mongoose.connect('mongodb://'+config.host+':'+config.port.toString()+'/'+config.db)

module.exports = mongoose