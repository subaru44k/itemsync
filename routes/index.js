var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ItemSync' });
});

router.get('/create', function(req, res, next) {
  res.render('create_channel', { title: 'ItemSync' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'ItemSync' });
});

module.exports = router;
