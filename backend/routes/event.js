var express = require('express');
var router = express.Router();
var Event = require('../DB/Schemas/Events_Schema');

/* GET ALL Events */
router.get('/', function(req, res, next) {
  Event.find(function (err, events) {
    if (err) return next(err);
    res.json(events);
  });
});


/* GET SINGLE EVENT BY ID */
router.get('/id/:id', function(req, res, next) {
  Event.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* GET NEXT EVENT  */
router.get('/next/:amount', function(req, res, next) {
  Event.find({
		"startTime":{$gte: new Date()}
    }, function (err, events) {
    if (err) return next(err);
    res.json(events);
  }).sort({"startTime":1}).limit(parseInt(req.params.amount));

});

/* SAVE EVENT */
router.post('/', function (req, res, next) {
  Event.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
