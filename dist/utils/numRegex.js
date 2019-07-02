"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phoneLength = exports.numRegex = void 0;

var numRegex = function numRegex(num) {
  var regex = /^[0-9]*$/;
  return regex.test(num);
};

exports.numRegex = numRegex;

var phoneLength = function phoneLength(num) {
  return num.length === 11 ? true : false;
};

exports.phoneLength = phoneLength;