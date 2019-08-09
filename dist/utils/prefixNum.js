"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandom = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable import/prefer-default-export */
_dotenv["default"].config();

var generateRandom = function generateRandom(len) {
  var keys = process.env["char"];
  var secretNum1 = process.env.numPrefix1;
  var secretNum2 = process.env.numPrefix2;
  var prefix = '';

  for (var i = 0; i < len; i += 1) {
    prefix += keys.charAt(Math.floor(Math.random() * 36));
  }

  return prefix + secretNum1 + prefix + secretNum2;
};

exports.generateRandom = generateRandom;