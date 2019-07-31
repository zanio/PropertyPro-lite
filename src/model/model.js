// db.js
/* eslint-disable camelcase, no-unused-expressions , no-unused-vars , prefer-const */

const { Pool } = require('pg');
const dotenv = require('dotenv');
const debug = require('debug')('http');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.ssl,
});

pool.on('connect', () => {
	debug('connected to the db');
});

/**
 * Create Reflection Table
 */
const createPropertyTable = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS property (
		id INT PRIMARY KEY,
		owner_email VARCHAR(128) NOT NULL,
        status TEXT,
        state TEXT NOT NULL,
		city TEXT NOT NULL,
		type VARCHAR(120) NOT NULL,
		price int NOT NULL,
		property_name TEXT,
        property_description TEXT ,
		contact_person_number VARCHAR(13) ,
		address TEXT NOT NULL,
		proof BOOLEAN,
		note TEXT,
		image_url TEXT NOT NULL,
		images_url TEXT [],
        created_on TIMESTAMP,
		modified_on TIMESTAMP,
        FOREIGN KEY (owner_email) REFERENCES users (email) ON DELETE CASCADE
	  )`;
	pool.query(queryText)
		.then((res) => {
			debug(res);
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
	const queryText = `CREATE TABLE IF NOT EXISTS flagged(
		id SERIAL PRIMARY KEY,
		report_id SERIAL NOT NULL,
		admin_name VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE
	  )`;
	pool.query(queryText)
		.then((res) => {
			debug(res);
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
	const queryText = `CREATE TABLE IF NOT EXISTS report(
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
			debug(res);
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
	const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        phone_number TEXT NOT NULL,
        address TEXT NOT NULL,
        gender VARCHAR(8),
        is_admin BOOLEAN DEFAULT False,
        is_verify BOOLEAN DEFAULT False,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

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


const creatAdminTable = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS
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

const dropFlaggedTable = () => {
	const queryText = 'DROP TABLE IF EXISTS flagged';
	pool.query(queryText)
		.then((res) => {
			pool.end();
		})
		.catch((err) => {
			pool.end();
		});
};
const dropReportTable = () => {
	const queryText = 'DROP TABLE IF EXISTS report';
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
	dropReportTable,
	dropFlaggedTable,
	createFlaggedTable,
	createReportTable,


};

require('make-runnable');
