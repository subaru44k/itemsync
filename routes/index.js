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

router.get('/private', function(req, res, next) {
  res.render('private_channels', { title: 'ItemSync' });
});

router.get('/publicchannels/:id', function(req, res, next) {
  res.render('public_channel', { title: 'ItemSync' , channelIdString: req.params.id, scriptPath: '/javascripts/publicchannel.bundle.js'})
});

router.get('/privatechannels/:id', function(req, res, next) {
  res.render('private_channel', { title: 'ItemSync' , channelIdString: req.params.id, scriptPath: '/javascripts/privatechannel.bundle.js' })
});

module.exports = router;
