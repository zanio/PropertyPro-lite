"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

/* eslint-disable no-undef ,func-names,
 prefer-destructuring, import/no-duplicates, no-unused-vars */
_chai["default"].use(_chaiHttp["default"]); // Our parent block

/*
  * Test the index /GET route and unnknown routes
  */


describe('/GET user account info', function () {
  it('it should test for "/" route ', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
  it('it should test for unknown route ', function (done) {
    _chai["default"].request(_app["default"]).get('*') // eslint-disable-next-line no-unused-vars
    .end(function (err, res) {
      (0, _chai.expect)(err).to.equal(err); // expect(res.status).to.equal(404);

      done();
    });
  });
});