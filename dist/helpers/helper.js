"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.generateToken = exports.isValidEmail = exports.hashPassword = exports.newDate = exports.generateId = exports.emailToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

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
/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */


exports.comparePassword = comparePassword;

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
      err: 'could not assign a token, make sure you provide a secret key'
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
      err: 'could not assign a token, make sure you provide a secret key'
    });
  });
};

exports.emailToken = emailToken;

var generateId = function generateId() {
  var rand = Math.floor(222 + Math.random() * 65665 + 400);
  return parseInt('220' + rand);
};

exports.generateId = generateId;