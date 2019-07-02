"use strict";

var _helper = require("../helpers/helper");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-undef */
var dbPath = require('./dbPath');

var _require = require(dbPath.userFileName),
    users = _require.users;

var getUsers = function getUsers() {
  return new Promise(function (resolve, reject) {
    if (users.length === 0) {
      reject({
        message: 'no user available',
        status: 202
      });
    }

    resolve(users);
  });
};

var getUser = function getUser(id) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(users, id).then(function (user) {
      return resolve(user);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

var insertUser = function insertUser(newUser) {
  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    var id = {
      id: (0, _helper.getNewId)(users)
    };
    var date = {
      createdAt: (0, _helper.newDate)()
    };
    newUser = _objectSpread({}, id, date, newUser);
    users.push(newUser);
    resolve(newUser);
    reject(err);
  });
};

var updateUser = function updateUser(id, newPost) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(users, id).then(function (post) {
      var index = user.findIndex(function (p) {
        return p.id == post.id;
      });
      id = {
        id: post.id
      };
      var date = {
        createdAt: post.createdAt,
        updated: (0, _helper.newDate)()
      };
      users[index] = _objectSpread({}, id, date, newPost);
      resolve(users[index]);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

var deleteUser = function deleteUser(id) {
  return new Promise(function (resolve, reject) {
    (0, _helper.mustBeInArray)(users, id).then(function () {
      users = users.filter(function (p) {
        return p.id !== id;
      });
      resolve(users);
    })["catch"](function (err) {
      return reject(err);
    });
  });
};

module.exports = {
  insertUser: insertUser,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};