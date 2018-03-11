var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ItemSync' });
});

router.get('/create', function(req, res, next) {
  res.render('create_channel', { title: 'ItemSync' });
});

router.get('/public', function(req, res, next) {
  res.render('public_channels', { title: 'ItemSync' });
});

router.get('/channels/:id', function(req, res, next) {
  res.render('channel', { title: 'ItemSync' , channelIdString: req.params.id })
})

module.exports = router;
