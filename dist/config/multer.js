"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerArrayUploads = exports.dataUris = exports.dataUri = exports.multerUploads = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _datauri = _interopRequireDefault(require("datauri"));

var dUri = new _datauri["default"]();

var storage = _multer["default"].memoryStorage();

var multerUploads = (0, _multer["default"])({
  storage: storage
}).single('image');
exports.multerUploads = multerUploads;
var multerArrayUploads = (0, _multer["default"])({
  storage: storage
}).array('myFiles', 4);
exports.multerArrayUploads = multerArrayUploads;

var dataUri = function dataUri(req) {
  return dUri.format(_path["default"].extname(req.file.originalname).toString(), req.file.buffer);
};

exports.dataUri = dataUri;

var dataUris = function dataUris(req) {
  var AlliUri = [];

  for (var i = 0; i < req.files.length; i++) {
    AlliUri.push(dUri.format(_path["default"].extname(req.files[i].originalname).toString(), req.files[i].buffer));
  }

  return AlliUri;
};

exports.dataUris = dataUris;