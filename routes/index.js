var express = require('express')
var router = express.Router()
var RandomBg = require('../modules/utils/randomBg')
var bgGenerator = new RandomBg()

/* GET home page. */
router.get('/', function(req, res, next) {
	var bg = bgGenerator.newBg();
	res.render('index', { title: 'Home', page: 'landing', screen: '', bgImg: bg })
});

module.exports = router