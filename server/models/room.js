const db = require('../database');

class Room {
	static retrieveAll(callback) {
		db.query('SELECT id, room_name from rooms ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static getRoom(itemId, callback) {
		db.query('SELECT room_name from rooms WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insert (item, callback) {
			db.query('INSERT INTO rooms (room_name) VALUES ($1)', [item], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static update (itemId, itemName, callback) {
			db.query('UPDATE rooms SET room_name = $1 WHERE id = $2', [itemName, itemId], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static delete (itemId, callback) {
		db.query('DELETE FROM rooms WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = Room;