var express = require('express');
var ScheduleItem = require('../models/ScheduleItem');

var router = express.Router();

router.get('/', function (req, res) {
	ScheduleItem.retrieveAll(function(err, item) {
		if(err)
			return res.json(err);
		return res.json(items);
	});
});

router.get('/:itemId', function(req, res) {
	var itemId = req.params.itemId;

	ScheduleItem.getRoom(itemId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.post('/', function (req, res) { //completed till here
	var roomName = req.body.roomName;

	ScheduleItem.insert(roomName, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function(req, res) {
	var roomId = req.body.roomId;
	var roomName = req.body.roomName;

	ScheduleItem.update(roomId, roomName, function(err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	}); //update (itemId, itemName, callback) {
});

router.delete('/', function (req, res) {
	var roomId = req.body.roomId;

	ScheduleItem.delete(roomId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;