"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Userrouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middlewares/auth/auth");

var _jsonweb = require("../middlewares/auth/jsonweb");

var _inputfield = require("../middlewares/field/inputfield");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Userrouter = _express["default"].Router();

exports.Userrouter = Userrouter;

var user = require('../models/user.model'); //let {users} = require('../data/users');


/* register a new User */
Userrouter.post('/auth/register', _auth.AdminCheck, _inputfield.checkFieldsUser, _inputfield.regCharCheck, _inputfield.regNumCheck, _inputfield.emailValidation, _auth.uniqueValue,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return user.insertUser(req.newUser).then(function (user) {
              return res.status(200).json({
                status: 200,
                data: user
              });
            })["catch"](function (err) {
              return res.status(500).json(err);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/* Login User */

Userrouter.post('/auth/login', _auth.AdminCheck, _inputfield.emailValidation, _auth.isSignUp, _jsonweb.jwtsign, function (req, res) {
  var _user = req._user;
  res.status(200).json(_user);
});
/* my account section */

Userrouter.get('/auth/my-account/*', _auth.authorization, _jsonweb.jwtVerify,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = req.result;
            res.status(200).json(result);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());