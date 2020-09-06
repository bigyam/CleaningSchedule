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
	//added in buidlstatement for update items.  multip update
	//test by daily masterbedroom sweep and vacuum adding.  then save.  
	queryMulti (insert, update) {
		console.log('query multi');
		(async() => {
			const client = await this._pool.connect();
			try{
				console.log('try');
				await client.query('BEGIN');
				if(insert)	await client.query(this.buildStatementInsert('INSERT INTO scheduleItems (yearScope, isActive, isComplete, lastComplete, task_id, room_id) VALUES ', insert));
				if(update) 	await client.query(this.buildStatement('WITH subquery (id, isactive, iscomplete) AS (VALUES ', update));
				await client.query('COMMIT');					
			} catch (e) {
				console.log('catch');
				await client.query('ROLLBACK');
				throw e;
			} finally {
				console.log('finally');
				client.release();
			}				
		})().catch(e => console.error(e.stack));
		console.log('query multi end');
	}

	end () {
		this._pool.end();
	}

	buildStatementInsert(insert, rows) {
		const params = [];
		const chunks = [];
		
		rows.forEach(row => {
			const valueClause = []
			Object.keys(row).forEach(p => {
				params.push(row[p])
				valueClause.push('$' + params.length)
			})
			chunks.push('(' + valueClause.join(', ') + ')')
		})
		return {
			text: insert + chunks.join(', '),
			values: params
		}
	}


	buildStatementUpdate(update, rows) {
		/**
		 *rows = [{
			 * itemId = 10
			 * name = Brian
			 * Age = 21
			 * },
			 * {
			 *  itemId = 11
			 * colName = Aaron
			 * colVal = 29
			 * }]
			 * 
			 * 
			 * UPDATE e
				SET name = t.name, age = t.age
				FROM dbo.employee e
				JOIN (
					SELECT itemId = '$1, name = $2, age = $3
					UNION ALL
					SELECT itemId = '$4, name = $5, age = $6
				) t ON t.itemId = e.itemId

WITH subquery (id, isactive, iscomplete) AS (VALUES (69, false, true), (70, false, true))
UPDATE scheduleitems
SET isactive = subquery.isactive, iscomplete = subquery.iscomplete
FROM subquery
WHERE scheduleitems.id = subquery.id
			 */
		const params = [];
		const chunks = [];
		
		rows.forEach(row => {
			const valueClause = []
			Object.keys(row).forEach(p => {
				params.push(row[p])
				valueClause.push('$' + params.length)
			})
			chunks.push('(' + valueClause.join(', ') + ')')
		})
		console.log('======================update statement: ', update + chunks.join(', ') + ')' + 'UPDATE scheduleitems SET isactive = subquery.isactive, iscomplete = subquery.iscomplete FROM subquery WHERE scheduleitems.id = subquery.id');
		return {
			text: update + chunks.join(', ') + ')' + 'UPDATE scheduleitems SET isactive = subquery.isactive, iscomplete = subquery.iscomplete FROM subquery WHERE scheduleitems.id = subquery.id',
			values: params
		}
	}


}

module.exports = new Database();