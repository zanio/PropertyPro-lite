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

var _helper = require("../helpers/helper");

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

var uploadone = function uploadone(singleimage, res) {
  return new Promise(function (resolve, reject) {
    _cloudinaryConfig.v2.uploader.upload(singleimage, {
      resource_type: 'image',
      public_id: 'api/screens/thumnail_' + (0, _helper.generateId)(),
      tags: ['screenshot', 'image'],
      audio_codec: "none",
      effect: "auto_contrast",
      gravity: "south",
      height: 300,
      radius: 0,
      width: 300,
      crop: "crop"
    }, function (err, result) {
      if (result) {
        var image = result.url;
        resolve(image);
      }

      if (err) {
        res.status(500).json({
          status: 500,
          err: err
        });
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
    var file, files, arrayImage, singlefile, multiplefiles, arrayImages;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.files !== undefined)) {
              _context3.next = 31;
              break;
            }

            file = (0, _multer.dataUri)(req).content;

            if (!req.files['images_url']) {
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

            if (!req.files['images_url']) {
              _context3.next = 21;
              break;
            }

            _context3.next = 18;
            return uploadall(files, arrayImage, 2);

          case 18:
            _context3.t1 = _context3.sent;
            _context3.next = 22;
            break;

          case 21:
            _context3.t1 = ['upload at least 3 images'];

          case 22:
            multiplefiles = _context3.t1;
            arrayImages = multiplefiles;

            if (singlefile && multiplefiles || multiplefiles) {
              req.Image_url = singlefile;
              req.gallery = arrayImages;
              next();
            }

            _context3.next = 31;
            break;

          case 27:
            _context3.prev = 27;
            _context3.t2 = _context3["catch"](11);

            if (!_context3.t2) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt("return", res.status(500).json({
              status: 500,
              error: ': THIS IS MOST LIKELY A NETWORK ERROR'
            }));

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[11, 27]]);
  }));

  return function cloudinaryHandler(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.cloudinaryHandler = cloudinaryHandler;