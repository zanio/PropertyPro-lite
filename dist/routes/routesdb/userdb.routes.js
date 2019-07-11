"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Userrouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../middlewares/auth/auth");

var _jsonweb = require("../../middlewares/auth/jsonweb");

var _Users = require("../../usingDb/controller/Users");

var _inputfield = require("../../middlewares/field/inputfield");

var Userrouter = _express["default"].Router();

exports.Userrouter = Userrouter;

/* register a new User */
Userrouter.post('/auth/register', _auth.AdminCheckDb, _inputfield.genderCheck, _inputfield.regCharCheck, _Users.createUser);
/* Login User */

Userrouter.post('/auth/login', _auth.AdminCheckDb, _Users.loginUser);
/* delete User Account */

Userrouter["delete"]('/auth/delete', _auth.authorization, _jsonweb.jwtVerify, _Users.deleteUser);
/* my email verification section */

Userrouter.get('/auth/verify', _Users.verifyUserEmail);
/* send reset password link to email */

Userrouter.get('/reset/', _Users.resetLink);
/* verify reset password link from email  */

Userrouter.patch('/reset/verify', _Users.resetPassword);
/* reset password if user remembers old password  */

Userrouter.patch('/reset/update', _auth.authorization, _jsonweb.jwtVerify, _Users.updatePassword);