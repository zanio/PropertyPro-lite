"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _helper = require("../../helpers/helper");

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
    newUser = (0, _objectSpread2["default"])({}, id, date, newUser);
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
      users[index] = (0, _objectSpread2["default"])({}, id, date, newPost);
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