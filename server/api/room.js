var express = require('express');
var Room = require('../models/room');

var router = express.Router();

router.get('/', function (req, res) {
	Room.retrieveAll(function(err, rooms) {
		if(err)
			return res.json(err);
		return res.json(rooms);
	});
});

router.get('/:roomId', function(req, res) {
	var roomId = req.params.roomId;

	Room.getRoom(roomId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.post('/', function (req, res) {
	var roomName = req.body.roomName;

	Room.insert(roomName, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function(req, res) {
	var roomId = req.body.roomId;
	var roomName = req.body.roomName;

	Room.update(roomId, roomName, function(err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	}); //update (itemId, itemName, callback) {
});

router.delete('/', function (req, res) {
	var roomId = req.body.roomId;

	Room.delete(roomId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;