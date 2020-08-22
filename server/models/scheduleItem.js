const db = require('../database');

class ScheduleItem {
	static retrieveAllActive(callback) {
		db.query('SELECT id, yearScope, isActive, isComplete, lastComplete, task_id, room_id from scheduleItems WHERE isActive = true ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
	static retrieveAll(callback) {
		db.query('SELECT id, yearScope, isActive, isComplete, lastComplete, task_id, room_id from scheduleItems ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static getScheduleItem(itemId, callback) {
		db.query('SELECT id, yearScope, isActive, isComplete, lastComplete, task_id, room_id from scheduleItems WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insert (scope, taskId, roomId, callback) {
			db.query('INSERT INTO scheduleItems (yearScope, isActive, isComplete, lastComplete, task_id, room_id) VALUES ($1, true, false, null, $2, $3)', [scope, taskId, roomId], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static update (itemId, colName, colValue, callback) {
			db.query('UPDATE scheduleItems SET $2 = $3 WHERE id = $1', [itemId, colName, colValue], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static updateIsActive (itemId, colValue, callback) {
		db.query('UPDATE scheduleItems SET isActive = $2 WHERE id = $1', [itemId, colValue], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static delete (itemId, callback) {
		db.query('DELETE FROM scheduleItems WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = ScheduleItem;