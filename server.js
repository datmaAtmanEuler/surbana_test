const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// import log utils
const log = require('./utils');
const pool = require('./db');

const app = express();
const port = 3000;

// using middwares
app.use(bodyParser.json());
// For log every request to the console on dev environment
app.use(morgan('dev'));

// start app on defined port
app.listen(port, () => {
	log(`Server running on port ${port}`);
});

/** Api - Create/Update/Delete a location

**/

/** Create location
* method: post
* params: name, addressPath, area (request body)
* return location with status 201 if success; error message with status 500 if error
**/
app.post('locations', async (req, res) => {
	const { name, addressPath, area } = req.body;
	try {
		const query = 'INSERT INTO locations (name, address_path, area) VALUES ($1, $2, $3) RETURNING *';
		const { rows } = await pool.query(query, [name, addressPath, area]);
		log(`Location created with id: ${rows[0].id}`);
		res.status(201).json(rows[0]);
	} catch (err) {
		log(`Create location failed, reason: ${err.message}`);
		res.status(500).json({ error: err.message });
	}
});

/** Update location
* method: put
* params: id (param query), name, addressPath, area (request body)
* return location with status 201 if success; error message with status 500 if error
**/
app.put('locations/:id', async (req, res) => {
	const { id } = req.params;
	const { name, addressPath, area } = req.body;
	try {
		const query = 'UPDATE locations SET name = $2, address_path = $3, area = $4 WHERE id = $1 RETURNING *';
		const { rows } = await pool.query(query, [id, name, addressPath, area]);
		if (rows.length < 1) {
			const errorMessage = 'Location not found';
			log(errorMessage);
			return res.status(404).json({ message: errorMessage });
		}
		log(`Location updated with id: ${rows[0].id}`);
		res.status(201).json(rows[0]);
	} catch (err) {
		log(`Update location failed, reason: ${err.message}`);
		res.status(500).json({ error: err.message });
	}
});

/** Delet location
* method: delete
* params: id (param query)
* return success message with status 201 if success; error message with status 500 if error
**/
app.delete('locations/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const query = 'DELETE FROM  locations WHERE id = $1 RETURNING *';
		const { rows } = await pool.query(query, [id]);
		if (rows.length < 1) {
			const errorMessage = 'Location not found';
			log(errorMessage);
			return res.status(404).json({ message: errorMessage });
		}
		log(`Location deleted with id: ${rows[0].id}`);
		res.status(201).json({ message: 'Location deleted successful' });
	} catch (err) {
		log(`Update location failed, reason: ${err.message}`);
		res.status(500).json({ error: err.message });
	}
});