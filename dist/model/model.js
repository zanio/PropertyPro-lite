"use strict";

// db.js

/* eslint-disable camelcase, no-unused-expressions , no-unused-vars , prefer-const */
var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

var debug = require('debug')('http');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.ssl
});
pool.on('connect', function () {
  debug('connected to the db');
});
/**
 * Create Reflection Table
 */

var createPropertyTable = function createPropertyTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS property (\n\t\tid INT PRIMARY KEY,\n\t\towner_email VARCHAR(128) NOT NULL,\n        status TEXT,\n        state TEXT NOT NULL,\n\t\tcity TEXT NOT NULL,\n\t\ttype VARCHAR(120) NOT NULL,\n\t\tprice int NOT NULL,\n\t\tproperty_name TEXT,\n        property_description TEXT ,\n\t\tcontact_person_number VARCHAR(13) ,\n\t\taddress TEXT NOT NULL,\n\t\tproof BOOLEAN,\n\t\tnote TEXT,\n\t\timage_url TEXT NOT NULL,\n\t\timages_url TEXT [],\n        created_on TIMESTAMP,\n\t\tmodified_on TIMESTAMP,\n        FOREIGN KEY (owner_email) REFERENCES users (email) ON DELETE CASCADE\n\t  )";
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};
/**
 * Create flagged Table
 */


var createFlaggedTable = function createFlaggedTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS flagged(\n\t\tid SERIAL PRIMARY KEY,\n\t\treport_id SERIAL NOT NULL,\n\t\tadmin_name VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP,\n        FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE\n\t  )";
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};
/**
 * Create report Table
 */


var createReportTable = function createReportTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS report(\n\t\tid SERIAL PRIMARY KEY,\n\t\tproperty_id SERIAL NOT NULL,\n\t\treporter_id UUID NOT NULL,\n        reason TEXT NOT NULL,\n        description TEXT NOT NULL,\n        experience TEXT NOT NULL,\n        created_date TIMESTAMP,\n        FOREIGN KEY (property_id) REFERENCES property (id) ON DELETE CASCADE\n\t  )";
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};
/**
 * Create User Table
 */


var createUserTable = function createUserTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      users(\n        id UUID PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR(128) NOT NULL,\n        phone_number TEXT NOT NULL,\n        address TEXT NOT NULL,\n        gender VARCHAR(8),\n        is_admin BOOLEAN DEFAULT False,\n        is_verify BOOLEAN DEFAULT False,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    debug(err);
    pool.end();
  });
};

var creatAdminTable = function creatAdminTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      admins(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        created_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};
/**
 * Drop Reflection Table
 */


var dropPropertyTable = function dropPropertyTable() {
  var queryText = 'DROP TABLE IF EXISTS property returning *';
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    debug(err);
    pool.end();
  });
};
/**
 * Drop Reflection Table
 */


var dropAdminsTable = function dropAdminsTable() {
  var queryText = 'DROP TABLE IF EXISTS admins returning *';
  pool.query(queryText).then(function (res) {
    debug(res);
    pool.end();
  })["catch"](function (err) {
    debug(err);
    pool.end();
  });
};
/**
 * Drop User Table
 */


var dropUserTable = function dropUserTable() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};

var dropFlaggedTable = function dropFlaggedTable() {
  var queryText = 'DROP TABLE IF EXISTS flagged';
  pool.query(queryText).then(function (res) {
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};

var dropReportTable = function dropReportTable() {
  var queryText = 'DROP TABLE IF EXISTS report';
  pool.query(queryText).then(function (res) {
    pool.end();
  })["catch"](function (err) {
    pool.end();
  });
};

pool.on('remove', function () {
  debug('client removed');
  process.exit(0);
});
module.exports = {
  createPropertyTable: createPropertyTable,
  createUserTable: createUserTable,
  dropPropertyTable: dropPropertyTable,
  dropUserTable: dropUserTable,
  creatAdminTable: creatAdminTable,
  dropAdminsTable: dropAdminsTable,
  dropReportTable: dropReportTable,
  dropFlaggedTable: dropFlaggedTable,
  createFlaggedTable: createFlaggedTable,
  createReportTable: createReportTable
};

require('make-runnable');