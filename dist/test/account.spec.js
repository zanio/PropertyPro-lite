"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

/* eslint-disable no-undef */
//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
_chai["default"].use(_chaiHttp["default"]); //Our parent block

/*
  * Test the /GET route
  */


describe('/GET user account info', function () {
  it('it should return no property advert created yet ', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/property-advert').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(404);
      done();
    });
  });
  it('it should return not found advert because search query value does not exist ', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/property-advert/search?type=fhfd').end(function (err, res) {
      (0, _chai.expect)(res.body.data.length).to.equal(0);
      done();
    });
  });
  it('it should GET unauthenticated user ', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/auth/my-account/*').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(401);
      done();
    });
  });
  it('it should GET authenticated user ', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/auth/my-account/*').set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
});