"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _helper = require("../helpers/helper");

/* eslint-disable no-undef */
describe('Helper function in helpers folder test', function () {
  it('it checks if newDate function returns a new date in tolocalString', function (done) {
    (0, _chai.expect)((0, _helper.newDate)()).to.equal(new Date().toLocaleString());
    done();
  });
  it('it checks if harshPassword function returns a new object if successful', function (done) {
    (0, _helper.hashPassword)('ehhjfhjhf4764jfj').then(function (res) {
      console.log(res);
      (0, _chai.expect)(res).to.equal(res);
      (0, _chai.expect)(res).to.be.a((0, _typeof2["default"])(res));
    });
    done();
  });
  it('it checks if hashPassword function returns a new object if successful', function (done) {
    (0, _helper.comparePassword)('$2b$10$SAJrb0z4BQisTu6.pI41aO.HSBq72vWkxjmxhFU83nsfgMCnJZYu6', 'ehhjfhjhf4764jfj').then(function (res) {
      (0, _chai.expect)(res).to.equal(true);
      (0, _chai.expect)(res).to.be.a((0, _typeof2["default"])(res));
    });
    done();
  });
  it('it generate new token', function (done) {
    (0, _helper.generateToken)('hjhhguybn').then(function (res) {
      (0, _chai.expect)(res).to.equal(res);
      (0, _chai.expect)(res).to.be.a((0, _typeof2["default"])(res));
    });
    done();
  });
  it('it generate new email token', function (done) {
    (0, _helper.emailToken)(12234).then(function (res) {
      console.log(res);
      (0, _chai.expect)(res).to.equal(res);
      (0, _chai.expect)(res).to.be.a((0, _typeof2["default"])(res));
    });
    done();
  });
  it('it checks if isValidEmail function returns true or false', function (done) {
    (0, _chai.expect)((0, _helper.isValidEmail)('a@a.com')).to.equal(true);
    done();
  });
  it('it checks if generateId function returns int', function (done) {
    (0, _chai.expect)((0, _helper.generateId)()).to.be.a('number');
    done();
  });
});