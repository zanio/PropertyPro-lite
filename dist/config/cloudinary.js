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

var _prefixNum = require("../utils/prefixNum");

/* eslint-disable import/prefer-default-export,  camelcase, no-console,
consistent-return,radix */
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
              return file.push(el.content);
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

var uploadall = function uploadall(array, arrayImage, n) {
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

                if (arrayImage[n]) {
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
  return new Promise(function (resolve, reject) {
    _cloudinaryConfig.v2.uploader.upload(singleimage, {
      resource_type: 'image',
      public_id: "api/screens/thumnail_".concat((0, _prefixNum.generateRandom)(7)),
      tags: ['screenshot', 'image'],
      audio_codec: 'none',
      effect: 'auto_contrast',
      gravity: 'south',
      height: 300,
      radius: 0,
      width: 300,
      crop: 'crop'
    }, function (err, result) {
      if (result) {
        var image = result.url;
        resolve(image);
      }

      if (err) {
        reject(err);
      }
    });
  });
};

var cloudinaryHandler =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var file, files, arrayImage, singlefile, no_images, multiplefiles, arrayImages;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.files !== undefined)) {
              _context3.next = 33;
              break;
            }

            file = (0, _multer.dataUri)(req).content;

            if (!req.files.images_url) {
              _context3.next = 8;
              break;
            }

            _context3.next = 5;
            return contentimg(req);

          case 5:
            _context3.t0 = _context3.sent;
            _context3.next = 9;
            break;

          case 8:
            _context3.t0 = null;

          case 9:
            files = _context3.t0;
            arrayImage = [];
            _context3.prev = 11;
            _context3.next = 14;
            return uploadone(file, res);

          case 14:
            singlefile = _context3.sent;
            no_images = req.files.images_url ? req.files.images_url.length - 1 : null;

            if (!req.files.images_url) {
              _context3.next = 22;
              break;
            }

            _context3.next = 19;
            return uploadall(files, arrayImage, no_images);

          case 19:
            _context3.t1 = _context3.sent;
            _context3.next = 23;
            break;

          case 22:
            _context3.t1 = ['upload at least 3 images'];

          case 23:
            multiplefiles = _context3.t1;
            arrayImages = multiplefiles;

            if (singlefile || singlefile && multiplefiles) {
              req.Image_url = singlefile;
              req.gallery = arrayImages;
              next();
            }

            _context3.next = 33;
            break;

          case 28:
            _context3.prev = 28;
            _context3.t2 = _context3["catch"](11);

            if (!_context3.t2) {
              _context3.next = 33;
              break;
            }

            console.log(_context3.t2);
            return _context3.abrupt("return", res.status(500).json({
              status: 500,
              error: _context3.t2
            }));

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[11, 28]]);
  }));

  return function cloudinaryHandler(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.cloudinaryHandler = cloudinaryHandler;