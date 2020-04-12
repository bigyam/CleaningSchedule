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

router.get('/singleRoom/', function(req, res) {
	var roomId = req.query.roomId;

	Room.getRoom(roomId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.post('/', function (req, res) {
	var roomName = req.body.roomName;
	var roomComplexity = req.body.roomComplexity;

	Room.insertRoom(roomName, roomComplexity, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function(req, res) {
	var roomId = req.body.roomId;
	var roomName = req.body.roomName;
	var roomComplexity = req.body.roomComplexity;

	Room.updateRoom(roomId, roomName, roomComplexity, function(err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

router.delete('/', function (req, res) {
	var roomId = req.body.roomId;
	console.log('roomid', roomId);

	Room.deleteRoom(roomId, function (err, result) {
		if(err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;