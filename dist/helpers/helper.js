"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeSearch = exports.adminDb = exports.getSubId = exports.harshPassword = exports.mustBeInArray = exports.newDate = exports.getNewId = void 0;

var _error = require("../data/error");

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

var harshPassword = function harshPassword(password) {
  var bcrypt = require('bcrypt');

  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      // pass = hash
      if (hash) resolve(hash);
      if (err) reject(err);
    });
  });
};

exports.harshPassword = harshPassword;

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

exports.typeSearch = typeSearch;