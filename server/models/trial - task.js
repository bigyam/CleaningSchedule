const db = require('../database');

class tasks {
	static retrieveAll() {
		db.query('SELECT id, name, isComplete from tasks ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static getTask(itemId, callback) {
		db.query('SELECT name, isComplete from tasks WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insert (item, callback) {
			db.query('INSERT INTO tasks (task_name, isComplete) VALUES ($1, false)', [item], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static update (itemId, itemName, completedBool, callback) {
			db.query('UPDATE tasks SET isComplete = $1, task_name = $2 WHERE id = $3', [completedBool, itemName, itemId], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static updateComplete (itemId, completedBool, callback) {
			db.query('UPDATE tasks SET isComplete = $1 WHERE id = $2', [completedBool, itemId], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static delete (itemId, callback) {
		db.query('DELETE FROM tasks WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = Tasks;