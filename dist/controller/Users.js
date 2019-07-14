"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePassword = exports.resetPassword = exports.resetLink = exports.verifyUserEmail = exports.createAdmin = exports.createUser = exports.loginUser = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = require("../db");

var _helper = require("../helpers/helper");

var _sendmail = require("../services/sendmail");

var _resetPassword = require("../services/template/resetPassword");

var _verifyEmail = require("../services/template/verifyEmail");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _url = _interopRequireDefault(require("url"));

/**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
var createUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, first_name, last_name, phone_number, address, gender, hashPass, createQuery, values, _ref2, rows, id, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, first_name = _req$body.first_name, last_name = _req$body.last_name, phone_number = _req$body.phone_number, address = _req$body.address, gender = _req$body.gender;
            email = email ? email.trim() : null;
            password = password ? password.trim() : null;
            first_name = first_name ? first_name.trim() : null;
            last_name = last_name ? last_name.trim() : null;
            phone_number = phone_number ? phone_number.trim() : null;
            address = address ? address.trim() : null;
            gender = gender ? gender.trim() : null;

            if (!(!email && !password && !first_name && !last_name && !phone_number)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: 'Some values are missing'
            }));

          case 10:
            if ((0, _helper.isValidEmail)(req.body.email.trim())) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: 'Please enter a valid email address'
            }));

          case 12:
            _context.next = 14;
            return (0, _helper.hashPassword)(password);

          case 14:
            hashPass = _context.sent;
            createQuery = "INSERT INTO\n      users(id, email, password,first_name,last_name,phone_number,address,gender,is_admin,is_verify, created_date,modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12)\n\t  returning *"; // const data = {first_name,last_name,phone_number,address,gender,is_admin:req.is_admin};

            values = [(0, _v["default"])(), email, hashPass, first_name, last_name, phone_number, address, gender, req.is_admin, 'False', (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
            _context.prev = 17;
            _context.next = 20;
            return (0, _db.query)(createQuery, values);

          case 20:
            _ref2 = _context.sent;
            rows = _ref2.rows;
            id = rows[0].id;
            _context.next = 25;
            return (0, _helper.generateToken)(id);

          case 25:
            token = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              status: 201,
              data: {
                id: id,
                token: token,
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                address: address,
                gender: gender,
                is_verify: rows[0].is_verify,
                is_admin: req.is_admin === 'False' ? false : true
              }
            }));

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](17);

            if (!(_context.t0.routine === '_bt_check_unique')) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              status: 409,
              error: 'User with that EMAIL already exist'
            }));

          case 33:
            if (!(_context.t0.routine === 'varchar')) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              status: 422,
              error: 'Phone Number cannot be more than 13 characters'
            }));

          case 35:
            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: 'Validation error, please make sure you fill in all input correctly'
            }));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[17, 29]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */


exports.createUser = createUser;

var loginUser =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, text, _ref4, rows, comparepass, _rows$, id, _email, first_name, last_name, phone_number, address, gender, is_admin, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (!(!email || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              status: 422,
              error: 'Some values are missing'
            }));

          case 3:
            if ((0, _helper.isValidEmail)(email)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              status: 422,
              error: 'Please enter a valid email address'
            }));

          case 5:
            text = 'SELECT * FROM users WHERE email=$1';
            _context2.prev = 6;
            _context2.next = 9;
            return (0, _db.query)(text, [req.body.email]);

          case 9:
            _ref4 = _context2.sent;
            rows = _ref4.rows;

            if (rows[0]) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              'message': 'The credentials you provided is incorrect'
            }));

          case 13:
            _context2.next = 15;
            return (0, _helper.comparePassword)(rows[0].password, password);

          case 15:
            comparepass = _context2.sent;

            if (comparepass) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              status: 422,
              error: 'The credentials you provided is incorrect'
            }));

          case 18:
            _rows$ = rows[0], id = _rows$.id, _email = _rows$.email, first_name = _rows$.first_name, last_name = _rows$.last_name, phone_number = _rows$.phone_number, address = _rows$.address, gender = _rows$.gender, is_admin = _rows$.is_admin;
            _context2.next = 21;
            return (0, _helper.generateToken)(id);

          case 21:
            token = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              status: 200,
              data: {
                id: id,
                token: token,
                email: _email,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                address: address,
                gender: gender,
                is_admin: is_admin
              }
            }));

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](6);
            return _context2.abrupt("return", res.status(400).json(_context2.t0));

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 25]]);
  }));

  return function loginUser(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */


exports.loginUser = loginUser;

var deleteUser =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var deleteQuery, _ref6, rows;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _db.query)(deleteQuery, [req.result.userId]);

          case 4:
            _ref6 = _context3.sent;
            rows = _ref6.rows;

            if (rows[0]) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              'message': 'user not found'
            }));

          case 8:
            return _context3.abrupt("return", res.status(204).json({
              'message': 'deleted'
            }));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(400).json(_context3.t0));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function deleteUser(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
   * Update A User password
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */


exports.deleteUser = deleteUser;

var updatePassword =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var _req$body3, old_password, new_password, updateQuery, selectQuery, newhash, _ref8, rows, comparepass;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, old_password = _req$body3.old_password, new_password = _req$body3.new_password;
            updateQuery = 'UPDATE users SET password = $1 WHERE id=$2 returning *';
            selectQuery = 'SELECT password FROM users WHERE id=$1';
            _context4.next = 5;
            return (0, _helper.hashPassword)(new_password);

          case 5:
            newhash = _context4.sent;
            _context4.prev = 6;
            _context4.next = 9;
            return (0, _db.query)(selectQuery, [req.result.userId]);

          case 9:
            _ref8 = _context4.sent;
            rows = _ref8.rows;
            _context4.next = 13;
            return (0, _helper.comparePassword)(rows[0].password, old_password);

          case 13:
            comparepass = _context4.sent;

            if (comparepass) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              status: 422,
              error: 'The credentials you provided is incorrect'
            }));

          case 16:
            _context4.next = 18;
            return (0, _db.query)(updateQuery, [newhash, req.result.userId]);

          case 18:
            return _context4.abrupt("return", res.status(200).json({
              status: 200,
              data: {
                message: 'Your password has been successfull reset'
              }
            }));

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](6);
            return _context4.abrupt("return", res.status(400).json(_context4.t0));

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 21]]);
  }));

  return function updatePassword(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


exports.updatePassword = updatePassword;

var createAdmin =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var email, createQuery, queryUsers, _ref10, rows, values, reponse;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            createQuery = "INSERT INTO admins(\n\t\temail,created_date)\n\t  VALUES($1,$2) returning *";
            queryUsers = "SELECT is_admin \n\tFROM users where id = $1";
            _context5.next = 5;
            return (0, _db.query)(queryUsers, [req.result.userId]);

          case 5:
            _ref10 = _context5.sent;
            rows = _ref10.rows;
            values = [email, (0, _moment["default"])(new Date())];
            _context5.prev = 8;

            if (!rows[0].is_admin) {
              _context5.next = 14;
              break;
            }

            _context5.next = 12;
            return (0, _db.query)(createQuery, values);

          case 12:
            reponse = _context5.sent;
            return _context5.abrupt("return", res.status(201).json({
              status: 201,
              data: reponse.rows[0]
            }));

          case 14:
            if (rows[0].is_admin) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.status(402).json({
              status: 402,
              error: 'Only an admin can create new admin'
            }));

          case 16:
            _context5.next = 21;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](8);
            return _context5.abrupt("return", res.status(400).send(_context5.t0));

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[8, 18]]);
  }));

  return function createAdmin(_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;

var verifyUserEmail =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var id, response, text, updateText, _ref12, rows, site;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = _url["default"].parse(req.url, true).query.id;
            _context6.next = 3;
            return _jsonwebtoken["default"].verify(id, process.env.SECRET_KEY);

          case 3:
            response = _context6.sent;
            _context6.prev = 4;
            text = 'SELECT is_verify,id FROM users WHERE id=$1';
            updateText = 'UPDATE users SET is_verify=$1 WHERE id =$2';
            _context6.next = 9;
            return (0, _db.query)(text, [response.userId]);

          case 9:
            _ref12 = _context6.sent;
            rows = _ref12.rows;
            site = process.env.NODE_ENV === 'development' ? 'http://localhost:3300' : 'https://propertpro-lite.herokuapp.com';

            if (!('https' + '://' + req.get('host') == site && rows[0].id)) {
              _context6.next = 16;
              break;
            }

            _context6.next = 15;
            return (0, _db.query)(updateText, ['True', rows[0].id]);

          case 15:
            return _context6.abrupt("return", res.status(200).json({
              status: 200,
              data: {
                is_verify: rows[0].is_verify
              }
            }));

          case 16:
            res.status(401).json({
              status: 401,
              error: 'This is a proctected route'
            });
            _context6.next = 22;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](4);
            return _context6.abrupt("return", res.status(400).json(_context6.t0));

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 19]]);
  }));

  return function verifyUserEmail(_x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}();

exports.verifyUserEmail = verifyUserEmail;

var resetLink =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var email, rand, verify_mail, token, link, text, _ref14, rows, data, resetmail;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            email = _url["default"].parse(req.url, true).query.email;
            rand = Math.floor(Math.random() * 100 + 54);
            verify_mail = {
              Subject: 'Password reset link',
              Recipient: email
            };
            _context7.prev = 3;
            _context7.next = 6;
            return (0, _helper.emailToken)(rand);

          case 6:
            token = _context7.sent;
            link = process.env.NODE_ENV === 'development' ? "http://localhost:3300/api/v1/reset/verify?id=".concat(token, "&email=").concat(email) : "".concat(req.protocol, "://").concat(req.get('host'), "/api/v1/reset/verify?id=").concat(token, "&email=").concat(email);
            text = 'SELECT first_name FROM users WHERE email=$1';
            _context7.next = 11;
            return (0, _db.query)(text, [email]);

          case 11:
            _ref14 = _context7.sent;
            rows = _ref14.rows;
            data = {
              email: email,
              first_name: rows[0].first_name,
              link: link
            };
            resetmail = new _sendmail.Mail(verify_mail, (0, _resetPassword.resetPass)(data));
            resetmail.main();
            return _context7.abrupt("return", res.status(200).json({
              status: 200,
              data: {
                message: 'Check your email for a reset link'
              }
            }));

          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](3);
            return _context7.abrupt("return", res.status(400).json(_context7.t0));

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 19]]);
  }));

  return function resetLink(_x13, _x14) {
    return _ref13.apply(this, arguments);
  };
}();

exports.resetLink = resetLink;

var resetPassword =
/*#__PURE__*/
function () {
  var _ref15 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var url_parts, response, password, hashPass, text, updateText, _ref16, rows, site;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url_parts = _url["default"].parse(req.url, true).query;
            _context8.next = 3;
            return _jsonwebtoken["default"].verify(url_parts.id, process.env.SECRET_KEY);

          case 3:
            response = _context8.sent;
            password = req.body.password;
            _context8.next = 7;
            return (0, _helper.hashPassword)(password);

          case 7:
            hashPass = _context8.sent;
            _context8.prev = 8;
            text = 'SELECT first_name FROM users WHERE email=$1';
            updateText = 'UPDATE users SET password=$1,modified_date=$2 WHERE email=$3 returning *';
            _context8.next = 13;
            return (0, _db.query)(text, [url_parts.email]);

          case 13:
            _ref16 = _context8.sent;
            rows = _ref16.rows;
            site = process.env.NODE_ENV === 'development' ? 'http://localhost:3300' : 'https://propertpro-lite.herokuapp.com';

            if (!(req.protocol + '://' + req.get('host') == site && response.code)) {
              _context8.next = 20;
              break;
            }

            _context8.next = 19;
            return (0, _db.query)(updateText, [hashPass, (0, _moment["default"])(new Date()), url_parts.email]);

          case 19:
            return _context8.abrupt("return", res.status(200).json({
              status: 200,
              data: {
                user: rows[0].first_name,
                message: 'your password has been reset successfully'
              }
            }));

          case 20:
            res.status(401).json({
              status: 401,
              error: 'This is a proctected route'
            });
            _context8.next = 26;
            break;

          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](8);
            return _context8.abrupt("return", res.status(400).json(_context8.t0));

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[8, 23]]);
  }));

  return function resetPassword(_x15, _x16) {
    return _ref15.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;