var express = require('express');
var ScheduleItem = require('../models/scheduleItem');

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

router.post('/', function (req, res) {
	var scope = req.body.scope;
	var taskId = req.body.taskId;
	var roomId = req.body.roomId;

	ScheduleItem.insert(scope, taskId, roomId, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function(req, res) {
	var itemId = req.body.itemId;
	var colName = req.body.colName;
	var colValue = req.body.colValue;

	ScheduleItem.update(itemId, colName, colValue, function(err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.delete('/', function (req, res) {
	var itemId = req.body.itemId;

	ScheduleItem.delete(itemId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;