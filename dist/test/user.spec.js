"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _app = _interopRequireDefault(require("../app"));

var _index = require("../model/index");

/* eslint-disable no-undef , prefer-destructuring, import/no-duplicates */
var request;
var token;
var userId;

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].use(_sinonChai["default"]);
/*
  * Test the /POST route
  */


describe('/Auth User', function () {
  before(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = _chai["default"].request(_app["default"]).keepOpen();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(function () {
    return _sinon["default"].restore();
  });
  after(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var deletequery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            deletequery = 'DELETE FROM users WHERE id = $1';
            _context2.next = 3;
            return (0, _index.query)(deletequery, [userId]);

          case 3:
            request.close();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('SIGNUP ROUTE', function () {
    describe('SIGNUP SUCCESSFULLY', function () {
      it('should have a status of 201',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var body, _ref4, response;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = {
                  email: 'akpsa.ani@yahoo.com',
                  password: 'ee',
                  address: 'block 199 flat 4',
                  phone_number: '08023456789',
                  first_name: 'Aniefiok',
                  last_name: 'Akpan'
                };
                _context3.next = 3;
                return request.post('/api/v1/auth/signup').send(body);

              case 3:
                _ref4 = _context3.sent;
                response = _ref4.response;
                token = response.body.data.token;
                userId = response.body.data.id;
                (0, _chai.expect)(response.body.status).to.equal(201);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))).timeout(0);
    });
    describe('SIGNUP WITHOUT PASSWORD FIELD', function () {
      it('should have a status of 400',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var body, response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                body = {
                  email: 'akp.s@yahoo.com',
                  password: '',
                  address: 'block 199 flat 4',
                  phone_number: '08023456789',
                  first_name: 'Aniefiok',
                  last_name: 'Akpan'
                };
                _context4.next = 3;
                return request.post('/api/v1/auth/signup').send(body);

              case 3:
                response = _context4.sent;
                (0, _chai.expect)(response.body.status).to.equal(400);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))).timeout(0);
    });
    describe('SIGNUP WITH invalid email', function () {
      it('should have a status of 409',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var body, response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = {
                  email: 'akp.aniyahoo.com',
                  address: 'block 199 flat 4',
                  password: 'ee',
                  phone_number: '08023456789',
                  first_name: 'Aniefiok',
                  last_name: 'Akpan'
                };
                _context5.next = 3;
                return request.post('/api/v1/auth/signup').send(body);

              case 3:
                response = _context5.sent;
                (0, _chai.expect)(response.body.status).to.equal(409);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))).timeout(0);
    });
    describe('SIGNUP WITH ALREADY EXISTING EMAIL', function () {
      it('should have a status of 409',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        var body, response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                body = {
                  email: 'akp.ani@yahoo.com',
                  address: 'block 199 flat 4',
                  password: 'ee',
                  phone_number: '08023456789',
                  first_name: 'Aniefiok',
                  last_name: 'Akpan'
                };
                _context6.next = 3;
                return request.post('/api/v1/auth/signup').send(body);

              case 3:
                response = _context6.sent;
                (0, _chai.expect)(response.body.status).to.equal(409);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))).timeout(0);
    });
  });
  describe('SIGNIN ROUTE', function () {
    describe('SIGNIN SUCCESSFULLY', function () {
      it('should have a status of 200',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7() {
        var body, response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                body = {
                  email: 'akp.ani@yahoo.com',
                  password: 'ee'
                };
                _context7.next = 3;
                return request.post('/api/v1/auth/signin').send(body);

              case 3:
                response = _context7.sent;
                (0, _chai.expect)(response.body.status).to.equal(200);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))).timeout(0);
    });
    describe('SIGNIN WITH MISMATCH PASSWORD', function () {
      it('should have a status of 422',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var body, response;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                body = {
                  email: 'akp.ani@yahoo.com',
                  password: 'eGe'
                };
                _context8.next = 3;
                return request.post('/api/v1/auth/signin').send(body);

              case 3:
                response = _context8.sent;
                (0, _chai.expect)(response.body.status).to.equal(422);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))).timeout(0);
    });
    describe('SIGNIN WITH INVALID EMAIL', function () {
      it('should have a status of 422',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9() {
        var body, response;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                body = {
                  email: 'akp.aniyahoo.com',
                  password: 'ee'
                };
                _context9.next = 3;
                return request.post('/api/v1/auth/signin').send(body);

              case 3:
                response = _context9.sent;
                (0, _chai.expect)(response.body.status).to.equal(422);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))).timeout(0);
    });
    describe('SIGNIN WITHOUT EMAIL', function () {
      it('should have a status of 422',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10() {
        var body, response;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                body = {
                  password: 'ee'
                };
                _context10.next = 3;
                return request.post('/api/v1/auth/signin').send(body);

              case 3:
                response = _context10.sent;
                (0, _chai.expect)(response.body.status).to.equal(422);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))).timeout(0);
    });
    describe('SIGNIN WITHOUT EMAIL ACCOUNT IN DATABASE', function () {
      it('should have a status of 403',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11() {
        var body, response;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                body = {
                  email: 'a@as.com',
                  password: 'ee'
                };
                _context11.next = 3;
                return request.post('/api/v1/auth/signin').send(body);

              case 3:
                response = _context11.sent;
                (0, _chai.expect)(response.body.status).to.equal(403);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))).timeout(0);
    });
  });
  describe('UPDATE PASSWORD IF USERS IS AUTHENTICATED', function () {
    describe('UPDATE PASWORD IF OLD_PASSWORD AND NEW_PASSWORD IS PRESENT', function () {
      it('should have a status of 200',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12() {
        var body, response;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                body = {
                  old_password: 'ee',
                  new_password: 'ss'
                };
                _context12.next = 3;
                return request.patch('/api/v1/reset/update').set('Authorization', token).send(body);

              case 3:
                response = _context12.sent;
                (0, _chai.expect)(response.body.status).to.equal(200);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))).timeout(0);
    });
    describe('UPDATE PASSWORD SHOULD FAIL BECAUSE PASSWORD DON"T MATCH', function () {
      it('should have a status of 422',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee13() {
        var body, response;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                body = {
                  old_password: 'eCe',
                  new_password: 'ss'
                };
                _context13.next = 3;
                return request.patch('/api/v1/reset/update').set('Authorization', token).send(body);

              case 3:
                response = _context13.sent;
                (0, _chai.expect)(response.body.status).to.equal(422);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))).timeout(0);
    });
  });
  describe('DELETE ROUTE', function () {
    describe('DELETE SUCCESSFULLY', function () {
      it('should have a status of 200',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee14() {
        var response;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return request["delete"]('/api/v1/auth/delete').set('Authorization', token);

              case 2:
                response = _context14.sent;
                (0, _chai.expect)(response.body.status).to.equal(204);
                (0, _chai.expect)(response.body).to.be.a('object');

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))).timeout(0);
    });
  });
});