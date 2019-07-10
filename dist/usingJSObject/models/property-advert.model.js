"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeProperty = exports.insertPropertyAdvert = exports.deletePropertyAdvert = exports.updatePropertyAdvert = exports.getPropertyAdverts = exports.getPropertyAdvert = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _helper = require("../../helpers/helper");

var _error = require("../data/error");

/* eslint-disable no-unused-vars */
var dbPath = require('./dbPath');

var _require = require('../data/users'),
    dbAdvert = _require.dbAdvert;

var getPropertyAdverts = function getPropertyAdverts() {
  return new Promise(function (resolve, reject) {
    if (dbAdvert.length === 0) {
      reject(_error.error.no_ads_err_404);
    }

    resolve(dbAdvert);
  });
};

exports.getPropertyAdverts = getPropertyAdverts;

var getPropertyAdvert = function getPropertyAdvert(id) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(dbAdvert, id).then(function (dbAdvert) {
      return resolve(dbAdvert);
    })["catch"](function (err) {
      return reject(_error.error.no_ads_err_404);
    });
  });
};

exports.getPropertyAdvert = getPropertyAdvert;

var getTypeProperty = function getTypeProperty(q) {
  return new Promise(function (resolve, reject) {
    (0, _helper.typeSearch)(dbAdvert, q).then(function (dbAdvert) {
      return resolve(dbAdvert);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

exports.getTypeProperty = getTypeProperty;

var insertPropertyAdvert = function insertPropertyAdvert(newcar) {
  return new Promise(function (resolve, reject) {
    var id = {
      id: (0, _helper.getSubId)(dbAdvert)
    };
    newcar = (0, _objectSpread2["default"])({}, id, newcar);
    dbAdvert.push(newcar);
    resolve(newcar);
  });
};

exports.insertPropertyAdvert = insertPropertyAdvert;

var updatePropertyAdvert = function updatePropertyAdvert(id, newPost) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(dbAdvert, id).then(function (post) {
      var index = dbAdvert.findIndex(function (p) {
        return p.id == post.id;
      });
      id = {
        id: post.id
      };
      var date = {
        createdAt: post.createdAt,
        updatedAt: (0, _helper.newDate)()
      };
      dbAdvert[index] = (0, _objectSpread2["default"])({}, id, date, newPost);
      resolve(dbAdvert[index]);
    })["catch"](function (err) {
      return reject(_error.error.no_ads_err_404);
    });
  });
};

exports.updatePropertyAdvert = updatePropertyAdvert;

var deletePropertyAdvert = function deletePropertyAdvert(id) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(dbAdvert, id).then(function () {
      dbAdvert = dbAdvert.filter(function (p) {
        return p.id != id;
      });
      resolve(dbAdvert);
    })["catch"](function (err) {
      return reject(_error.error.no_ads_err_404);
    });
  });
};

exports.deletePropertyAdvert = deletePropertyAdvert;