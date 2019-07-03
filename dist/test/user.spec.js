"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-undef */
//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
_chai["default"].use(_chaiHttp["default"]); //Our parent block

/*
  * Test the /POST route
  */


describe('/POST User', function () {
  it('it should register new user ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      first_name: 'Aniefiok',
      last_name: 'Akpan',
      password: 'jhfdcthjk24r44',
      address: '12, ifelodun',
      gender: 'male',
      phone_number: '09012343212'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.data).to.have.property('email');
      (0, _chai.expect)(res.body.data).to.have.property('first_name');
      (0, _chai.expect)(res.body.data).to.have.property('last_name');
      (0, _chai.expect)(res.body.data).to.have.property('password');
      (0, _chai.expect)(res.body.data).to.have.property('id');
      (0, _chai.expect)(res.body.data).to.have.property('address');
      (0, _chai.expect)(res.body.data).to.have.property('gender');
      (0, _chai.expect)(res.body.data).to.have.property('phone_number');
      (0, _chai.expect)(res.body.data).to.have.property('is_Admin').equal(false);
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return email already in use ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      first_name: 'Aniefiok',
      last_name: 'Akpan',
      password: 'jhfdcthjk24r44',
      address: '12, ifelodun',
      gender: 'male',
      phone_number: '09012343212'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return phone number can only be 11 digits ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      first_name: 'Aniefiok',
      last_name: 'Akpan',
      password: 'jhfdcthjk24r44',
      address: '12, ifelodun',
      gender: 'male',
      phone_number: '090143212'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(404);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should login existing user ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      password: 'jhfdcthjk24r44'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/login').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.data).to.have.property('email');
      (0, _chai.expect)(res.body.data).to.have.property('first_name');
      (0, _chai.expect)(res.body.data).to.have.property('last_name');
      (0, _chai.expect)(res.body.data).to.have.property('password');
      (0, _chai.expect)(res.body.data).to.have.property('id');
      (0, _chai.expect)(res.body.data).to.have.property('address');
      (0, _chai.expect)(res.body.data).to.have.property('gender');
      (0, _chai.expect)(res.body.data).to.have.property('phone_number');
      (0, _chai.expect)(res.body.data).to.have.property('token');
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return password  does not match ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      password: 'jhfthjk24r44'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/login').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return all field required ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      password: 'jhfthjk24r44'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return first_name and last_name field can only be letter ', function (done) {
    var body = {
      email: 'davephenom@gmail.com',
      first_name: 'An4iefiok',
      last_name: 'Akp34an',
      password: 'jhfdcthjk24r44',
      address: '12, ifelodun',
      gender: 'male',
      phone_number: '09012343212'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(403);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should return invalid email ', function (done) {
    var body = {
      email: 'davephenomgmail.com',
      password: 'jhfdcthjk24r44'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/login').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.status).to.equal(402);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
  it('it should register user as admin ', function (done) {
    var body = {
      email: 'akp.ani@yahoo.com',
      first_name: 'Aniefiok',
      last_name: 'Akpan',
      password: 'jhfdcthjk24r44',
      address: '12, ifelodun',
      gender: 'male',
      phone_number: '09012343212'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/register').send(body).end(function (err, res) {
      (0, _chai.expect)(res.body.data).to.have.property('email');
      (0, _chai.expect)(res.body.data).to.have.property('first_name');
      (0, _chai.expect)(res.body.data).to.have.property('last_name');
      (0, _chai.expect)(res.body.data).to.have.property('password');
      (0, _chai.expect)(res.body.data).to.have.property('id');
      (0, _chai.expect)(res.body.data).to.have.property('address');
      (0, _chai.expect)(res.body.data).to.have.property('gender');
      (0, _chai.expect)(res.body.data).to.have.property('phone_number');
      (0, _chai.expect)(res.body.data).to.have.property('is_Admin').equal(true);
      (0, _chai.expect)(res.body.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
});