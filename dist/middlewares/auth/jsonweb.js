"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtVerify = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable import/prefer-default-export */
_dotenv["default"].config();

var jwtVerify = function jwtVerify(req, res, next) {
  var token = req.token;

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, result) {
    if (err) {
      res.status(401).json({
        status: 401,
        error: 'failed jwt verification'
      });
    } else {
      req.result = result;
      next();
    }
  });
};

exports.jwtVerify = jwtVerify;