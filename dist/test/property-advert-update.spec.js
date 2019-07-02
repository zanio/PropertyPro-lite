"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
_chai["default"].use(_chaiHttp["default"]); //Our parent block

/*
  * Test the Car /POST route


  */


describe(' PATCH AD ROUTES', function () {
  it('it should post property advert ', function (done) {
    this.timeout(10000);
    var body = {
      status: 'sold',
      price: '12443.44',
      state: 'benin',
      city: 'vi',
      address: 'block 188',
      type: 'flat',
      contact_person_number: '098123456732',
      property_name: 'adewale',
      contact_person_address: 'block 199 flat 4',
      proof: 'yes i do',
      note: 'just be a good buyer'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/property-advert/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk').attach('image', 'src/test/Screenshot (24).png').field(body).end(function (err, res) {
      (0, _chai.expect)(err).to.equal(null);
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should update property of a given id ', function (done) {
    this.timeout(10000);
    var body = {
      status: 'available',
      price: '12443.44',
      state: 'benin',
      city: 'vi',
      address: 'block 188',
      type: 'mini-flat',
      contact_person_number: '098123456732',
      property_name: 'adewale',
      contact_person_address: 'block 199 flat 4',
      proof: 'yes i do',
      note: 'just be a good buyer'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/property-advert/43501').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk').attach('image', 'src/test/Screenshot (24).png').field(body).end(function (err, res) {
      (0, _chai.expect)(err).to.equal(null);
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return failed jwt verification ', function (done) {
    this.timeout(10000);
    var body = {
      status: 'available',
      price: '12443.44',
      state: 'benin',
      city: 'vi',
      address: 'block 188',
      type: 'mini-flat',
      contact_person_number: '098123456732',
      property_name: 'adewale',
      contact_person_address: 'block 199 flat 4',
      proof: 'yes i do',
      note: 'just be a good buyer'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/property-advert/43501').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjboRlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk').attach('image', 'src/test/Screenshot (24).png').field(body).end(function (err, res) {
      (0, _chai.expect)(err).to.equal(null);
      (0, _chai.expect)(res.status).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return no token to validate ', function (done) {
    var body = {
      status: 'available',
      price: '12443.44',
      state: 'benin',
      city: 'vi',
      address: 'block 188',
      type: 'mini-flat',
      contact_person_number: '098123456732',
      property_name: 'adewale',
      contact_person_address: 'block 199 flat 4',
      proof: 'yes i do',
      note: 'just be a good buyer'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/property-advert/43501').attach('image', 'src/test/Screenshot (24).png').field(body).end(function (err, res) {
      (0, _chai.expect)(err).to.equal(null);
      (0, _chai.expect)(res.status).to.equal(401);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return 404 because patch id was not found ', function (done) {
    this.timeout(10000);
    var body = {
      status: 'available',
      price: '12443.44',
      state: 'benin',
      city: 'vi',
      address: 'block 188',
      type: 'flat',
      contact_person_number: '098123456732',
      property_name: 'adewale',
      contact_person_address: 'block 199 flat 4',
      proof: 'yes i do',
      note: 'just be a good buyer'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/property-advert/435hg').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk').attach('image', 'src/test/Screenshot (24).png').field(body).end(function (err, res) {
      (0, _chai.expect)(err).to.equal(null);
      (0, _chai.expect)(res.status).to.equal(404);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
});