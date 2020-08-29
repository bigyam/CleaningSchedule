var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:Andy@456852@localhost:5432/cleaningSchedule';
const SSL = process.env.NODE_ENV === 'production';

class Database {
	constructor () {
		this._pool = new Pool({
			connectionString: CONNECTION_STRING,
			ssl: SSL
		});

		this._pool.on('error', (err, client) => {
	  	console.error('Unexpected error on idle PostgreSQL client.', err);
	  	process.exit(-1);
		});
	}

	query (query, ...args) {
		this._pool.connect((err, client, done) => {
			if (err) throw err;
			const params = args.length === 2 ? args[0] : [];
			const callback = args.length === 1 ? args[0] : args[1];

			client.query(query, params, (err, res) => {
				done();
				if (err) {
				console.log(err.stack);
				return callback({ error: 'Database error.' }, null);
				}
				callback({}, res.rows);
			});
    	});
	}
	//TODO: transaction for update and insert.  
	//https://node-postgres.com/features/transactions
	/**queryMulti (insertStatement, updateStatement) {
		this._pool.connect(pgConString, function(err, client, done) {
			const shouldAbort = err => {
				if (err) {
					console.error('Error in transaction', err.stack)
					client.query('ROLLBACK', err => {
						if (err) {
							console.error('Error rolling back client', err.stack)
						}
						// release the client back to the pool
						done()
					})
				}
				return !!err
			}
			client.query('BEGIN', err => {
				if (shouldAbort(err)) return
				client.query(insertStatement, (err, res) =>{
					if(shouldAbort(err)) return
					client.query(updateStatement, (err, res) => {
						if(shouldAbort(err)) return

						client.query('COMMIT', err=> {
							if (err) {
								console.error('Error committing transaction', err.stack);
							}
							done()
						})
					})
				})
			})
			client.query(insertStatement);
			client.query(updateStatement);
			client.on("error", function(err) {
				callBack("DB queryMulti failed. Error Message: " + err, null);
				return;
			});

			})
		});
	}**/
	//trying with async/await
	queryMulti (insertStatement, updateStatement) {
		async() 
	}
	end () {
		this._pool.end();
	}

	//TODO: this may not work.  
	buildStatement (insert, rowsInsert, update, rowsUpdate) {
		const paramsInsert = []
		const chunksInsert = []
		const paramsUpdate = []
		const chunksUpdate = []
		rowsInsert.forEach(row => {
			const valueClauseInsert = []
			Object.keys(row).forEach(p => {
				paramsInsert.push(row[p])
				valueClauseInsert.push('$' + paramsInsert.length)
			})
			chunksInsert.push('(' + valueClauseInsert.join(', ') + ')')
		})
		rowsUpdate.forEach(row => {
			const valueClauseUpdate = []
			Object.keys(row).forEach(p => {
				paramsUpdate.push(row[p])
				valueClauseUpdate.push('$' + paramsUpdate.length)
			})
			chunksUpdate.push('(' + valueClauseUpdate.join(', ') + ')')
		})
		return {
			text: insert + chunksInsert.join(', '),
			values: paramsInsert
		}
	} 
}

module.exports = new Database();