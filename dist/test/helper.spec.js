"use strict";

var _chai = require("chai");

var _helper = require("../helpers/helper");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var array = [{
  first_name: 'clington',
  last_name: 'tuoyo',
  is_Admin: true,
  email: 'clingtoneyituoyo@gmail.com',
  id: 234013005001,
  type: 'flat'
}, {
  first_name: 'clington',
  last_name: 'tuoyo',
  is_Admin: true,
  email: 'clingtoneyituoyo@gmail.com',
  id: 234013005001,
  type: 'mini-flat'
}, {
  first_name: 'clington',
  last_name: 'tuoyo',
  is_Admin: true,
  email: 'clingtoneyituoyo@gmail.com',
  id: 234013005001,
  type: 'flat'
}];
var subid = [{
  id: 43501
}];
describe('Helper function in helpers folder test', function () {
  it('it checks if getNewId function returns a new id++ number', function (done) {
    (0, _chai.expect)((0, _helper.getNewId)(array)).to.equal(234013005002);
    done();
  });
  it('it checks if getNewId function returns a new id number', function (done) {
    (0, _chai.expect)((0, _helper.getNewId)([])).to.equal(234013005001);
    done();
  });
  it('it checks if getSubId function returns a new id++ number', function (done) {
    (0, _chai.expect)((0, _helper.getSubId)(subid)).to.equal(43502);
    done();
  });
  it('it checks if getSubId function returns a new id number', function (done) {
    (0, _chai.expect)((0, _helper.getSubId)([])).to.equal(43501);
    done();
  });
  it('it checks if newDate function returns a new date in tolocalString', function (done) {
    (0, _chai.expect)((0, _helper.newDate)()).to.equal(new Date().toLocaleString());
    done();
  });
  it('it checks if mustBeInArray function returns a new object if successful ', function (done) {
    (0, _helper.mustBeInArray)(array, '234013005001').then(function (res) {
      (0, _chai.expect)(res).to.equal(res);
    });
    done();
  });
  it('it checks if mustBeInArray function does not returns a new object if error exist', function (done) {
    (0, _helper.mustBeInArray)(array, '234013005008')["catch"](function (err) {
      (0, _chai.expect)(err.status).to.equal(404);
    });
    done();
  });
  it('it checks if harshPassword function returns a new object if successful', function (done) {
    (0, _helper.harshPassword)('ehhjfhjhf4764jfj').then(function (res) {
      (0, _chai.expect)(res).to.equal(res);
      (0, _chai.expect)(res).to.be.a(_typeof(res));
    });
    done();
  });
  it('it checks if adminDb function returns a new object if successful', function (done) {
    (0, _helper.adminDb)(array, 'clingtoneyituoyo@gmail.com').then(function (res) {
      (0, _chai.expect)(res).to.be.a('object');
      (0, _chai.expect)(res).to.be.a(_typeof(res));
    });
    done();
  });
  it('it checks if typeSearch function returns a new object if successful', function (done) {
    (0, _helper.typeSearch)(array, 'flat').then(function (res) {
      (0, _chai.expect)(res).to.be.equal(res);
    });
    done();
  });
  it('it checks if typeSearch function returns an error object', function (done) {
    (0, _helper.typeSearch)(array, 'ghght')["catch"](function (err) {
      (0, _chai.expect)(err.status).to.equal(404);
    });
    done();
  });
});