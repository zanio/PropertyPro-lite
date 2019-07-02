"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Userrouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middlewares/auth/auth");

var _jsonweb = require("../middlewares/auth/jsonweb");

var _inputfield = require("../middlewares/field/inputfield");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Userrouter = _express["default"].Router();

exports.Userrouter = Userrouter;

var user = require('../models/user.model'); //let {users} = require('../data/users');


/* register a new User */
Userrouter.post('/auth/register', _auth.AdminCheck, _inputfield.checkFieldsUser, _inputfield.regCharCheck, _inputfield.regNumCheck, _inputfield.emailValidation, _auth.uniqueValue, function (req, res) {
  user.insertUser(req.newUser).then(function (user) {
    return res.status(200).json({
      status: 200,
      data: user
    });
  })["catch"](function (err) {
    return res.status(500).json(err);
  }); // eslint-disable-next-line no-console
  //console.log(users);
});
/* Login User */

Userrouter.post('/auth/login', _auth.AdminCheck, _inputfield.emailValidation, _auth.isSignUp, _jsonweb.jwtsign, function (req, res) {
  var _user = req._user;
  res.status(200).json(_user);
});
/* my account section */

Userrouter.get('/auth/my-account/*', _auth.authorization, _jsonweb.jwtVerify, function (req, res) {
  var result = req.result;
  res.status(200).json(result);
});