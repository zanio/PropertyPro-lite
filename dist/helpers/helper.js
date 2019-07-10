"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.generateToken = exports.isValidEmail = exports.typeSearch = exports.adminDb = exports.getSubId = exports.hashPassword = exports.mustBeInArray = exports.newDate = exports.emailToken = exports.getNewId = void 0;

var _error = require("../usingJSObject/data/error");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var getNewId = function getNewId(array) {
  if (array.length > 0) {
    var n;
    var idValue = array[array.length - 1].id;
    n = idValue + 1;
    return n;
  } else {
    return 234013005001;
  }
};

exports.getNewId = getNewId;

var getSubId = function getSubId(array) {
  if (array.length > 0) {
    var n;
    var idValue = array[array.length - 1].id;
    n = idValue + 1;
    return n;
  } else {
    return 43501;
  }
};

exports.getSubId = getSubId;

var newDate = function newDate() {
  return new Date().toLocaleString();
};

exports.newDate = newDate;

var mustBeInArray = function mustBeInArray(array, id) {
  return new Promise(function (resolve, reject) {
    var row = array.find(function (r) {
      return r.id == id;
    });

    if (!row) {
      reject(_error.error.user_404);
    }

    resolve(row);
  });
};

exports.mustBeInArray = mustBeInArray;

var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].hash(password, 10, function (err, hash) {
      resolve(hash);
      reject(err);
    });
  });
};

exports.hashPassword = hashPassword;

var comparePassword = function comparePassword(hashpassword, password) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].compare(password, hashpassword, function (err, bool) {
      resolve(bool);
      reject(err);
    });
  });
};

exports.comparePassword = comparePassword;

var adminDb = function adminDb(array, email) {
  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    var db = array.find(function (r) {
      return r.email === email;
    });
    resolve(db);
  });
};

exports.adminDb = adminDb;

var typeSearch = function typeSearch(array, type) {
  return new Promise(function (resolve, reject) {
    var db = array.filter(function (r) {
      return r.type === type;
    });

    if (!db) {
      reject(_error.error.property_404);
    }

    resolve(db);
  });
};
/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */


exports.typeSearch = typeSearch;

var isValidEmail = function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
};
/**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */


exports.isValidEmail = isValidEmail;

var generateToken = function generateToken(id) {
  return new Promise(function (resolve, reject) {
    var token = _jsonwebtoken["default"].sign({
      userId: id
    }, process.env.SECRET_KEY, {
      expiresIn: '7d'
    });

    if (token) resolve(token);
    if (!token) reject({
      err: 'could not assign a token'
    });
  });
};

exports.generateToken = generateToken;

var emailToken = function emailToken(rand) {
  return new Promise(function (resolve, reject) {
    var token = _jsonwebtoken["default"].sign({
      code: rand
    }, process.env.SECRET_KEY, {
      expiresIn: '5m'
    });

    if (token) resolve(token);
    if (!token) reject({
      err: 'could not assign a token'
    });
  });
};

exports.emailToken = emailToken;