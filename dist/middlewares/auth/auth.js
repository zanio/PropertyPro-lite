"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idCheck = exports.authorization = exports.AdminCheckDb = exports.typeAdvert = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _numRegex = require("../../utils/numRegex");

var _db = require("../../db");

var _url = _interopRequireDefault(require("url"));

/* eslint-disable no-console */
var authorization = function authorization(req, res, next) {
  var token_body = req.body.token;
  var header = req.header('Authorization');

  if (typeof token_body !== 'undefined' || typeof header !== 'undefined') {
    var bearer = token_body ? token_body : header;
    var token = bearer;
    req.token = token;
    next();
  } else {
    res.status(401).json({
      status: 402,
      error: 'You are not authorized to access this route'
    });
  }
};

exports.authorization = authorization;

var AdminCheckDb =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var adminSelectQuery, email, _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adminSelectQuery = 'SELECT * FROM admins WHERE email = $1';
            email = req.body.email;
            _context.next = 4;
            return (0, _db.query)(adminSelectQuery, [email]);

          case 4:
            _ref2 = _context.sent;
            rows = _ref2.rows;

            if (rows.length !== 0) {
              req.is_admin = 'True';
              next();
            } else {
              req.is_admin = 'False';
              next();
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function AdminCheckDb(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.AdminCheckDb = AdminCheckDb;

var idCheck = function idCheck(req, res, next) {
  var id = req.params.id;

  if ((0, _numRegex.numRegex)(id)) {
    next();
  } else {
    res.status(404).json({
      status: 404,
      error: 'that id does not exist in the database'
    });
  }
};

exports.idCheck = idCheck;

var typeAdvert = function typeAdvert(req, res, next) {
  var url_parts = _url["default"].parse(req.url, true).query;

  if (url_parts.type) {
    req.type = url_parts.type;
    next();
  } else {
    res.status(404).json({
      status: 404,
      error: 'That type of advert does not exist'
    });
  }
};

exports.typeAdvert = typeAdvert;