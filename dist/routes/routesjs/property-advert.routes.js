"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyrouter = void 0;

var _multer = require("../../config/multer");

var _url = _interopRequireDefault(require("url"));

var _cloudinary = require("../../config/cloudinary");

var _propertyAdvert = require("../../usingJSObject/models/property-advert.model");

var _auth = require("../../middlewares/auth/auth");

var _jsonweb = require("../../middlewares/auth/jsonweb");

var _inputfield = require("../../middlewares/field/inputfield");

var express = require('express');

var propertyrouter = express.Router();
exports.propertyrouter = propertyrouter;
//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _auth.getId, function (req, res) {
  var data = req.data;
  (0, _propertyAdvert.insertPropertyAdvert)(data).then(function (response) {
    res.status(200).json({
      status: 200,
      data: response
    });
  });
});
propertyrouter.patch('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _auth.getPreviousId, function (req, res) {
  var data = req.data;
  var id = req.params.id;
  (0, _propertyAdvert.updatePropertyAdvert)(id, data).then(function (response) {
    res.status(200).json({
      status: 200,
      data: response
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});
propertyrouter.patch('/property-advert/:id/sold', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _auth.getSingleIdProperty, function (req, res) {
  var data = req.data;
  var id = req.params.id;
  (0, _propertyAdvert.updatePropertyAdvert)(id, data).then(function (response) {
    res.status(200).json({
      status: 200,
      data: response
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});
propertyrouter["delete"]('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _auth.toDeleteId, function (req, res) {
  var id = req.params.id;
  (0, _propertyAdvert.deletePropertyAdvert)(id) // eslint-disable-next-line no-unused-vars
  .then(function (response) {
    res.status(204).json({
      status: 204,
      data: {
        message: "advert with the ".concat(id, " id has been successfully deleted")
      }
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});
propertyrouter.get('/property-advert', function (req, res) {
  (0, _propertyAdvert.getPropertyAdverts)().then(function (response) {
    res.status(201).json({
      status: 200,
      data: response
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});
propertyrouter.get('/property-advert/search', function (req, res) {
  var url_parts = _url["default"].parse(req.url, true).query;

  (0, _propertyAdvert.getTypeProperty)(url_parts.type).then(function (response) {
    res.status(201).json({
      status: 200,
      data: response
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});
propertyrouter.get('/property-advert/:id', function (req, res) {
  (0, _propertyAdvert.getPropertyAdvert)(req.params.id).then(function (response) {
    res.status(201).json({
      status: 200,
      data: response
    });
  })["catch"](function (err) {
    return res.status(404).json(err);
  });
});