"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "uploader", {
  enumerable: true,
  get: function get() {
    return _cloudinary.uploader;
  }
});
exports.cloudinaryConfig = void 0;

var _cloudinary = require("cloudinary");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var cloudinaryConfig = function cloudinaryConfig(req, res, next) {
  (0, _cloudinary.config)({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  next();
};

exports.cloudinaryConfig = cloudinaryConfig;