"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtsign = exports.jwtVerify = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _error = require("../../data/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
_dotenv["default"].config();

var jwtsign = function jwtsign(req, res, next) {
  var user = req.user;

  var decoded = _jsonwebtoken["default"].verify(user.token, process.env.SECRET_KEY);

  var valid = decoded.code;

  if (valid) {
    next();
  } else {
    res.status(402).json(_error.error.failed_auth_402);
  }
};

exports.jwtsign = jwtsign;

var jwtVerify = function jwtVerify(req, res, next) {
  var token = req.token;

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, result) {
    if (err) {
      res.status(401).json(_error.error.autthorization_401);
    } else {
      req.result = result;
      next();
    }
  });
};

exports.jwtVerify = jwtVerify;