"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminrouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../middlewares/auth/auth");

var _jsonweb = require("../../middlewares/auth/jsonweb");

var _property = require("../../usingDb/controller/property");

var _Users = require("../../usingDb/controller/Users");

var adminrouter = _express["default"].Router();

exports.adminrouter = adminrouter;

/* flag a reported property */
adminrouter.put('/admin/property-advert/:id/flagged', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.flaggedProperty);
adminrouter.post('/admin/register', _auth.authorization, _jsonweb.jwtVerify, _Users.createAdmin);