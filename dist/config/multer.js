"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerArrayUploads = exports.cpUpload = exports.dataUris = exports.dataUri = exports.multerUploads = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _datauri = _interopRequireDefault(require("datauri"));

var dUri = new _datauri["default"]();

var storage = _multer["default"].memoryStorage();

var multerUploads = (0, _multer["default"])({
  storage: storage
}).single('image_url');
exports.multerUploads = multerUploads;
var cpUpload = (0, _multer["default"])({
  storage: storage
}).fields([{
  name: 'image_url',
  maxCount: 1
}, {
  name: 'images_url',
  maxCount: 4
}]);
exports.cpUpload = cpUpload;
var multerArrayUploads = (0, _multer["default"])({
  storage: storage
}).array('images_url', 4);
exports.multerArrayUploads = multerArrayUploads;

var dataUri = function dataUri(req) {
  return dUri.format(_path["default"].extname(req.files['image_url'][0].originalname).toString(), req.files['image_url'][0].buffer);
};

exports.dataUri = dataUri;

var dataUris = function dataUris(req) {
  var AlliUri = [];

  if (req.files['images_url']) {
    for (var i = 0; i < req.files['images_url'].length; i++) {
      AlliUri.push(dUri.format(_path["default"].extname(req.files['images_url'][i].originalname).toString(), req.files['images_url'][i].buffer));
    }
  }

  return AlliUri;
};

exports.dataUris = dataUris;