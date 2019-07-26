"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringCheck = stringCheck;
exports.Arr = exports.checkLetter = void 0;

/* eslint-disable indent */
function stringCheck(el) {
  return typeof el === 'string' ? true : false;
}

var Arr = function Arr(obj) {
  var values = Object.values(obj);
  var regex = /^[a-zA-Z\s-]+$/;
  var arr = [];
  values.map(function (val) {
    return arr.push(regex.test(val));
  });
  return arr;
};

exports.Arr = Arr;

var checkLetter = function checkLetter(arrs) {
  var falseCheck = true;

  for (var i = 0; i < arrs.length; i++) {
    if (!arrs[i]) {
      return false;
    }
  }

  return falseCheck;
};

exports.checkLetter = checkLetter;