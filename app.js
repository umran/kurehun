var config = require('./config')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

//load redis settings
var redisConf = config.redis

//load api settings, instagrams, flickrs, youtubes, soundclouds, etc
var igConf = config.api.instagram
var fkConf = config.api.flickr


var index = require('./routes/index')
var users = require('./routes/users')
var igAuth = require('./routes/auth/instagram')(igConf)
var fkAuth = require('./routes/auth/flickr')(fkConf)

var app = express()

app.set('trust proxy', 1)

// setup secure sessions
app.use(session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: true},
	store: new RedisStore({
		host: redisConf.host,
		port: redisConf.port,
		db: redisConf.db.sessions
	})
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/auth/instagram', igAuth)
app.use('/auth/flickr', fkAuth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app