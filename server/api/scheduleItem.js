var express = require('express');
var ScheduleItem = require('../models/scheduleItem');

var router = express.Router();

router.get('/', function (req, res) {
	ScheduleItem.retrieveAllActive(function(err, items) {
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
	var body = req.body;
	var existing;
	ScheduleItem.retrieveAll(function(items) {
		//TODO: test whether adding a existing (isActive = false) item to database will set to true, rather than create new one. 
		existing = items;
		console.log('existing1', existing);
		body.forEach(item => {
			if(!item.id){
				console.log('item', item);
				let isItemExist = existing.find(x => x.yearscope == item.yearScope && x.room_id == item.room_id && x.task_id == item.task_id);
				if(isItemExist){
					ScheduleItem.updateIsActive(isItemExist.id, true, function (err, result) {
						if(err)
							return res.json(err);
						return res.json(result);
					});
				} else {
					ScheduleItem.insert(item.yearScope, item.task_id, item.room_id, function (err, result) {
						if (err)
							return res.json(err);
						return res.json(result);
					});
				}			
			}
		});
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

router.post('/delete', function (req, res) {
	var body = req.body;

	body.forEach(item => {
		ScheduleItem.updateIsActive(item.id, item.isactive, function (err, result) {
			if(err)
				return res.json(err);
			return res.json(result);
		});
	})
});

module.exports = router;