"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable camelcase, no-unused-expressions , no-unused-vars ,
 prefer-const, import/prefer-default-export */
_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
/**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.query = query;