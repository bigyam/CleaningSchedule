const db = require('../database');

class Task {
	static retrieveAll() {
		db.query('SELECT id, task_name from tasks ORDER BY id DESC', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static getTask(itemId, callback) {
		db.query('SELECT task_name from tasks WHERE id = $1', [itemId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insert (item, callback) {
			db.query('INSERT INTO tasks (task_name) VALUES ($1)', [item], function (err, res) {
				if (err.error)
					return callback(err);
				callback(res);
			});
	}

	static update (itemId, itemName, callback) {
			db.query('UPDATE tasks SET task_name = $1 WHERE id = $2', [itemName, itemId], function (err, res) {
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

module.exports = Task;