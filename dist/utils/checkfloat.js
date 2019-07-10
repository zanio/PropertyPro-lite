"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var checkFloat = function checkFloat(num) {
  var regex = /^[+-]?\d+(\.\d+)?$/;
  var regexTest = regex.test(num);
  if (regexTest) return parseFloat(num);
  return false;
};

var _default = checkFloat;
exports["default"] = _default;