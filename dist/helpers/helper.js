"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.generateToken = exports.isValidEmail = exports.adminDb = exports.getSubId = exports.hashPassword = exports.newDate = exports.generateId = exports.emailToken = exports.getNewId = void 0;

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
/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */


exports.adminDb = adminDb;

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

var generateId = function generateId() {
  var rand = Math.floor(Math.random() * 1000 + 400);
  console.log(rand, rand + 1000);
  return rand + 1000;
};

exports.generateId = generateId;