"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandom = void 0;

var key = require('../config/keys');

var generateRandom = function generateRandom(len) {
  var keys = key["char"];
  var secretNum1 = key.numPrefix1;
  var secretNum2 = key.numPrefix2;
  var prefix = "";

  for (var i = 0; i < len; i++) {
    prefix += keys.charAt(Math.floor(Math.random() * 36));
  }

  return secretNum1 + prefix + secretNum2;
};

exports.generateRandom = generateRandom;