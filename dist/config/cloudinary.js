"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudinaryHandler = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cloudinaryConfig = require("./cloudinaryConfig");

var _multer = require("./multer");

var _auth = require("../middlewares/auth/auth");

var contentimg =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req) {
    var file;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = [];
            _context.next = 3;
            return (0, _multer.dataUris)(req).map(function (el) {
              file.push(el.content);
            });

          case 3:
            return _context.abrupt("return", file);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function contentimg(_x) {
    return _ref.apply(this, arguments);
  };
}();

var uploadall = function uploadall(array, arrayImage) {
  return new Promise(function (resolve, reject) {
    array.map(
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(file) {
        var result, image;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _cloudinaryConfig.uploader.upload(file);

              case 3:
                result = _context2.sent;
                _context2.next = 6;
                return result.url;

              case 6:
                image = _context2.sent;
                arrayImage.push(image);

                if (arrayImage[3]) {
                  resolve(arrayImage);
                }

                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                if (_context2.t0) reject(_context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

var uploadone = function uploadone(singleimage) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(resolve, reject) {
      var result, image;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _cloudinaryConfig.uploader.upload(singleimage);

            case 3:
              result = _context3.sent;
              _context3.next = 6;
              return result.url;

            case 6:
              image = _context3.sent;

              if (image) {
                resolve(image);
              }

              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              if (_context3.t0) reject(_context3.t0);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var cloudinaryHandler =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    var file, singlefile;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.file !== undefined)) {
              _context4.next = 17;
              break;
            }

            file = (0, _multer.dataUri)(req).content; // console.log(file)
            // let files = await contentimg(req);
            // let arrayImage = [];

            console.log(req.file);
            _context4.prev = 3;
            _context4.next = 6;
            return uploadone(file);

          case 6:
            singlefile = _context4.sent;
            //const multiplefiles = await uploadall(files,arrayImage);
            //let arrayImages = multiplefiles;
            req.Image_url = singlefile; //req.Image_urls = arrayImages;

            next();
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](3);

            if (!_context4.t0) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(500).json({
              status: 500,
              error: _context4.t0.message
            }));

          case 15:
            _context4.next = 19;
            break;

          case 17:
            console.log(req.file);
            next();

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 11]]);
  }));

  return function cloudinaryHandler(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.cloudinaryHandler = cloudinaryHandler;