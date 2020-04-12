const db = require('../database');

class Room {
	static retrieveAll(callback) {
		db.query('SELECT id, room_name, complexity from rooms ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static getRoom(itemId, callback) {
		db.query('SELECT room_name, complexity from rooms WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insertRoom (itemName, itemComplexity, callback) {
			db.query('INSERT INTO rooms (room_name, complexity) VALUES ($1, $2)', [itemName, itemComplexity], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static updateRoom (itemId, itemName, itemComplexity, callback) {
			db.query('UPDATE rooms SET room_name = $1, complexity = $3 WHERE id = $2', [itemName, itemId, itemComplexity], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static deleteRoom (itemId, callback) {
		db.query('DELETE FROM rooms WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = Room;