"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyrouter = void 0;

var _multer = require("../middlewares/multer");

var _url = _interopRequireDefault(require("url"));

var _cloudinary = require("../middlewares/cloudinary");

var _propertyAdvert = require("../models/property-advert.model");

var _auth = require("../middlewares/auth/auth");

var _jsonweb = require("../middlewares/auth/jsonweb");

var _inputfield = require("../middlewares/field/inputfield");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var propertyrouter = express.Router();
exports.propertyrouter = propertyrouter;
//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _auth.getId,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = req.data;
            (0, _propertyAdvert.insertPropertyAdvert)(data).then(function (response) {
              res.status(200).json({
                status: 200,
                data: response
              });
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
propertyrouter.patch('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _auth.getPreviousId,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var data, id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = req.data;
            id = req.params.id;
            (0, _propertyAdvert.updatePropertyAdvert)(id, data).then(function (response) {
              res.status(200).json({
                status: 200,
                data: response
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 3:
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
propertyrouter.patch('/property-advert/:id/sold', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _auth.getSingleIdProperty,
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var data, id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = req.data;
            id = req.params.id;
            (0, _propertyAdvert.updatePropertyAdvert)(id, data).then(function (response) {
              res.status(200).json({
                status: 200,
                data: response
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
propertyrouter["delete"]('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _auth.toDeleteId,
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            (0, _propertyAdvert.deletePropertyAdvert)(id) // eslint-disable-next-line no-unused-vars
            .then(function (response) {
              res.status(201).json({
                status: 201,
                data: {
                  message: "advert with the ".concat(id, " id has been successfully deleted")
                }
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
propertyrouter.get('/property-advert',
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            (0, _propertyAdvert.getPropertyAdverts)().then(function (response) {
              res.status(201).json({
                status: 200,
                data: response
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
propertyrouter.get('/property-advert/search',
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var url_parts;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url_parts = _url["default"].parse(req.url, true).query;
            (0, _propertyAdvert.getTypeProperty)(url_parts.type).then(function (response) {
              res.status(201).json({
                status: 200,
                data: response
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
propertyrouter.get('/property-advert/:id',
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            (0, _propertyAdvert.getPropertyAdvert)(req.params.id).then(function (response) {
              res.status(201).json({
                status: 200,
                data: response
              });
            })["catch"](function (err) {
              return res.status(404).json(err);
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());