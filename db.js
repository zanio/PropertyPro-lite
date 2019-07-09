// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('http');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	debug('connected to the db');
});

/**
 * Create Reflection Table
 */
const createPropertyTable = () => {
	const queryText =
    `CREATE TABLE IF NOT EXISTS property (
		id SERIAL PRIMARY KEY,
		owner_id UUID NOT NULL,
        status TEXT NOT NULL,
        state TEXT NOT NULL,
		city TEXT NOT NULL,
		type VARCHAR(120) NOT NULL,
		price int NOT NULL,
		property_name TEXT NOT NULL,
        property_description TEXT NOT NULL,
		contact_person_number VARCHAR(13) NOT NULL,
		contact_person_address TEXT NOT NULL,
		proof BOOLEAN NOT NULL,
		note TEXT NOT NULL,
		image TEXT NOT NULL,
        created_date TIMESTAMP,
		modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
	  )`;
	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};

/**
 * Create flagged Table
 */
const createFlaggedTable = () => {
	const queryText =
    `CREATE TABLE IF NOT EXISTS flagged(
		id SERIAL PRIMARY KEY,
		report_id SERIAL NOT NULL,
		admin_name VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE
	  )`;
	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};

/**
 * Create report Table
 */
const createReportTable = () => {
	const queryText =
    `CREATE TABLE IF NOT EXISTS report(
		id SERIAL PRIMARY KEY,
		property_id SERIAL NOT NULL,
		reporter_id UUID NOT NULL,
        reason TEXT NOT NULL,
        description TEXT NOT NULL,
        experience TEXT NOT NULL,
        created_date TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES property (id) ON DELETE CASCADE
	  )`;
	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};

/**
 * Create User Table
 */
const createUserTable = () => {
	const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        phone_number VARCHAR(13) NOT NULL,
        address TEXT NOT NULL,
        gender VARCHAR(8) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT False,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			debug(err);
			pool.end();
		});
};


const creatAdminTable = () => {
	const queryText =
    `CREATE TABLE IF NOT EXISTS
      admins(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        created_date TIMESTAMP
      )`;

	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};

/**
 * Drop Reflection Table
 */
const dropPropertyTable = () => {
	const queryText = 'DROP TABLE IF EXISTS property returning *';
	pool.query(queryText)
		.then((res) => {
			debug(res);
			pool.end();
		})
		.catch((err) => {
			debug(err);
			pool.end();
		});
};


/**
 * Drop Reflection Table
 */
const dropAdminsTable = () => {
	const queryText = 'DROP TABLE IF EXISTS admins returning *';
	pool.query(queryText)
		.then((res) => {
			debug(res);
			pool.end();
		})
		.catch((err) => {
			debug(err);
			pool.end();
		});
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
	const queryText = 'DROP TABLE IF EXISTS users';
	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};


pool.on('remove', () => {
	debug('client removed');
	process.exit(0);
});

module.exports = {
	createPropertyTable,
	createUserTable,
	dropPropertyTable,
	dropUserTable,
	creatAdminTable,
	dropAdminsTable,
	createFlaggedTable,
	createReportTable
	

};

require('make-runnable');
