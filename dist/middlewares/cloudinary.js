"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudinaryHandler = void 0;

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var _multer = require("./multer");

var _error = require("../data/error");

var cloudinaryHandler = function cloudinaryHandler(req, res, next) {
  if (req.file) {
    var file = (0, _multer.dataUri)(req).content;
    return _cloudinaryConfig.uploader.upload(file).then(function (result) {
      var image = result.url;
      result.tags.push('screenshot');
      result.public_id = 'api/screen';
      req.Image_url = image;
      next(); // eslint-disable-next-line no-unused-vars
    })["catch"](function (err) {
      return res.status(400).json(_error.error.network_err_400);
    });
  }
};

exports.cloudinaryHandler = cloudinaryHandler;