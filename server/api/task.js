var express = require('express');
var Task = require('../models/task');

var router = express.Router();

router.get('/', function (req, res) {
	Task.retrieveAll(function(err, tasks) {
		if(err)
			return res.json(err);
		return res.json(tasks);
	});
});

router.get('/:taskId', function(req, res) {
	var taskId = req.params.taskId;

	Task.getTask(taskId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.post('/', function (req, res) {
	var taskName = req.body.taskName;

	Task.insert(taskName, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function(req, res) {
	var taskId = req.body.taskId;
	var taskName = req.body.taskName;

	Task.update(taskId, taskName, function(err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	}); //update (itemId, itemName, callback) {
});

router.delete('/', function (req, res) {
	var taskId = req.body.taskId;

	Task.delete(taskId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;