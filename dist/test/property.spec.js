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

var _index = require("../db/index");

var _helper = require("../helpers/helper");

/* eslint-disable no-undef */
var request;
var propertyId;
var firstUserToken;
var secondUserToken;
var firstUserId;
var secondUserId;
var reportId;
var firstUserEmail;
var propertyId1;

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].use(_sinonChai["default"]);
/*
  * Test the /POST route
  */


describe('/property', function () {
  before(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var firstUser, secondUser, firstUserResponse, secondUserResponse, propertyBody, propertyResponse, reportBody, reportResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = _chai["default"].request(_app["default"]).keepOpen();
            this.timeout(0);
            firstUser = {
              email: 'akp.anibv@yahoo.com',
              password: 'ee',
              address: 'block 199 flat 4',
              phone_number: '08023456789',
              first_name: 'Aniefiok',
              last_name: 'Akpan'
            };
            secondUser = {
              email: 'akpan.ani@yahoo.com',
              password: 'ee',
              address: 'block 199 flat 4',
              phone_number: '08023456789',
              first_name: 'Aniefiok',
              last_name: 'Akpan'
            };
            _context.next = 6;
            return request.post('/api/v1/auth/signup').send(firstUser);

          case 6:
            firstUserResponse = _context.sent;
            firstUserToken = firstUserResponse.body.data.token;
            firstUserId = firstUserResponse.body.data.id;
            firstUserEmail = firstUserResponse.body.data.email;
            _context.next = 12;
            return request.post('/api/v1/auth/signup').send(secondUser);

          case 12:
            secondUserResponse = _context.sent;
            secondUserId = secondUserResponse.body.data.id;
            secondUserToken = secondUserResponse.body.data.token;
            propertyBody = {
              state: 'lagos',
              city: 'lekki',
              type: '2 bedroom',
              price: '23890',
              address: 'block 199 flat 4, jakande estate'
            };
            _context.next = 18;
            return request.post('/api/v1/property').set('Authorization', firstUserToken).attach('image_url', 'src/test/Screenshot (24).png').field(propertyBody);

          case 18:
            propertyResponse = _context.sent;
            propertyId = propertyResponse.body.data.id;
            reportBody = {
              reason: 'frudulent',
              description: 'frudulent without proof',
              experience: 'terrible'
            };
            _context.next = 23;
            return request.post("/api/v1/property/".concat(propertyId, "/report")).set('Authorization', secondUserToken).send(reportBody);

          case 23:
            reportResponse = _context.sent;
            reportId = reportResponse.body.data.id;

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  afterEach(function () {
    return _sinon["default"].restore();
  });
  after(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var userQuery, propertyQuery, reportQuery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userQuery = 'DELETE FROM users WHERE id = $1';
            propertyQuery = 'DELETE FROM property WHERE id = $1';
            reportQuery = 'DELETE FROM report WHERE id = $1';
            _context2.next = 5;
            return (0, _index.query)(userQuery, [firstUserId]);

          case 5:
            _context2.next = 7;
            return (0, _index.query)(userQuery, [secondUserId]);

          case 7:
            _context2.next = 9;
            return (0, _index.query)(reportQuery, [reportId]);

          case 9:
            _context2.next = 11;
            return (0, _index.query)(propertyQuery, [propertyId]);

          case 11:
            request.close();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('PROPERTY CREATE ROUTE', function () {
    describe('PROPERTY ADVERT SUCCESS', function () {
      it('should have a status of 201',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var body, response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = {
                  state: 'lagos',
                  city: 'lekki',
                  type: '2 bedroom',
                  price: '23890',
                  address: 'block 199 flat 4, jakande estate'
                };
                _context3.next = 3;
                return request.post('/api/v1/property').set('Authorization', firstUserToken).attach('image_url', 'src/test/Screenshot (24).png').field(body);

              case 3:
                response = _context3.sent;
                propertyId1 = response.body.data.id;
                (0, _chai.expect)(response.body.status).to.equal(201);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))).timeout(0);
    });
    describe('PROPERTY ADVERT WITH UNKNOWN TOKEN', function () {
      it('should have a status of 401',
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
                  state: 'lagos',
                  city: 'lekki',
                  type: '2 bedroom',
                  price: '23890',
                  address: 'block 199 flat 4, jakande estate'
                };
                _context4.next = 3;
                return request.post('/api/v1/property').set('Authorization', 'hjjfjriu').attach('image_url', 'src/test/Screenshot (24).png').field(body);

              case 3:
                response = _context4.sent;
                (0, _chai.expect)(response.body.status).to.equal(401);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))).timeout(0);
    });
    describe('PROPERTY ADVERT WITHOUT IMAGE', function () {
      it('should have a status of 403',
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
                  state: 'lagos',
                  city: 'lekki',
                  type: '2 bedroom',
                  price: '23890',
                  address: 'block 199 flat 4, jakande estate'
                };
                _context5.next = 3;
                return request.post('/api/v1/property').set('Authorization', firstUserToken).attach('image_url', '').field(body);

              case 3:
                response = _context5.sent;
                (0, _chai.expect)(response.body.status).to.equal(403);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))).timeout(0);
    });
    describe('PROPERTY ADVERT BECAUSE THERE IS A MISSING REQUIRED FIELD', function () {
      it('should have a status of 403',
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
                  state: 'lagos',
                  city: '',
                  type: '2 bedroom',
                  price: '23890',
                  address: 'block 199 flat 4, jakande estate'
                };
                _context6.next = 3;
                return request.post('/api/v1/property').set('Authorization', firstUserToken).attach('image_url', 'src/test/Screenshot (24).png').field(body);

              case 3:
                response = _context6.sent;
                (0, _chai.expect)(response.body.status).to.equal(403);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))).timeout(0);
    });
  });
});