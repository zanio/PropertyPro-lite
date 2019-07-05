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

var user = require('../models/user.model');

/* register a new User */
Userrouter.post('/auth/register', _auth.AdminCheck, _inputfield.checkFieldsUser, _inputfield.regCharCheck, _inputfield.regNumCheck, _inputfield.emailValidation, _auth.uniqueValue, _inputfield.genderCheck, function (req, res) {
  user.insertUser(req.newUser).then(function (_ref) {
    var id = _ref.id,
        createdAt = _ref.createdAt,
        token = _ref.token,
        first_name = _ref.first_name,
        last_name = _ref.last_name,
        email = _ref.email,
        address = _ref.address,
        phone_number = _ref.phone_number,
        gender = _ref.gender,
        is_Admin = _ref.is_Admin;
    return res.status(200).json({
      status: 201,
      data: {
        id: id,
        createdAt: createdAt,
        token: token,
        first_name: first_name,
        last_name: last_name,
        email: email,
        address: address,
        phone_number: phone_number,
        gender: gender,
        is_Admin: is_Admin
      }
    });
  })["catch"](function (err) {
    return res.status(500).json(err);
  }); // eslint-disable-next-line no-console
  //console.log(users);
});
/* Login User */

Userrouter.post('/auth/login', _auth.AdminCheck, _inputfield.emailValidation, _auth.isSignUp, _jsonweb.jwtsign, function (req, res) {
  var _req$user = req.user,
      id = _req$user.id,
      createdAt = _req$user.createdAt,
      token = _req$user.token,
      first_name = _req$user.first_name,
      last_name = _req$user.last_name,
      email = _req$user.email,
      address = _req$user.address,
      phone_number = _req$user.phone_number,
      gender = _req$user.gender,
      is_Admin = _req$user.is_Admin;
  res.status(200).json({
    status: 200,
    data: {
      id: id,
      createdAt: createdAt,
      token: token,
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      phone_number: phone_number,
      gender: gender,
      is_Admin: is_Admin
    }
  });
});
/* my account section */

Userrouter.get('/auth/my-account/*', _auth.authorization, _jsonweb.jwtVerify, function (req, res) {
  var result = req.result;
  res.status(200).json(result);
});