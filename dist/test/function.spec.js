"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _string = require("../utils/string");

var _numRegex = require("../utils/numRegex");

var _checkfloat = _interopRequireDefault(require("../utils/checkfloat"));

/* eslint-disable no-undef ,func-names,
 prefer-destructuring, import/no-duplicates, no-unused-vars */
describe('Test for checkLetter() function', function () {
  it('it checks if checkLetter function returns false', function (done) {
    var arr = [false, true, false, true, true];
    (0, _chai.expect)((0, _string.checkLetter)(arr)).to.equal(false);
    done();
  });
  it('it checks if stringCheck() returns true ', function (done) {
    (0, _chai.expect)((0, _string.stringCheck)('teststring')).to.equal(true);
    done();
  });
  it('it checks if stringCheck() returns false ', function (done) {
    (0, _chai.expect)((0, _string.stringCheck)(122)).to.equal(false);
    done();
  });
  it('it checks if phoneLength() returns false ', function (done) {
    (0, _chai.expect)((0, _numRegex.phoneLength)('122')).to.equal(false);
    done();
  });
  it('it checks if phoneLength() returns true ', function (done) {
    (0, _chai.expect)((0, _numRegex.phoneLength)('09023456712')).to.equal(true);
    done();
  });
  it('it checks if checkLetter function returns true', function (done) {
    var arr = [true, true, true, true];
    (0, _chai.expect)((0, _string.checkLetter)(arr)).to.equal(true);
    done();
  });
});
describe('Test for checkFloat() function', function () {
  it('it checks if checkFloat function returns false', function (done) {
    var arr = 'as445';
    (0, _chai.expect)((0, _checkfloat["default"])(arr)).to.equal(false);
    done();
  });
  it('it checks if checkFloat function returns float', function (done) {
    var arr = '445.45';
    (0, _chai.expect)((0, _checkfloat["default"])(arr)).to.equal(445.45);
    done();
  });
});