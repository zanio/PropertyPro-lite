"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyrouter = void 0;

var _multer = require("../config/multer");

var _cloudinary = require("../config/cloudinary");

var _auth = require("../middlewares/auth/auth");

var _jsonweb = require("../middlewares/auth/jsonweb");

var _inputfield = require("../middlewares/field/inputfield");

var _property = require("../controller/property");

var express = require('express');

var propertyrouter = express.Router();
exports.propertyrouter = propertyrouter;

/* create propertyadvert advert  */
propertyrouter.post('/property', _multer.multerUploads, _inputfield.checkPropertyEmpty, _auth.authorization, _jsonweb.jwtVerify, _cloudinary.cloudinaryHandler, _property.createProperty);
propertyrouter.patch('/property/:id', _auth.idCheck, _inputfield.updateprice, _auth.authorization, _jsonweb.jwtVerify, _property.updateProperty);
propertyrouter.patch('/property/:id/sold', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.updatePropertyStatus);
propertyrouter["delete"]('/property/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.deleteProperty);
propertyrouter.get('/property', _property.getAllProperty);
propertyrouter.get('/property/user', _auth.authorization, _jsonweb.jwtVerify, _property.getAllPropertyOfUser);
propertyrouter.post('/property/:id/report', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.reportProperty);
propertyrouter.get('/property/search', _auth.typeAdvert, _property.getTypeProperty);
propertyrouter.get('/property/:id', _auth.idCheck, _property.getOneProperty);
propertyrouter.get('/property/flagged/:id', _auth.idCheck, _property.getOneFlaggedProperty);
propertyrouter.get('/flagged', _property.getAllFlaggedProperty);
propertyrouter.get('/property/address/:id', _auth.idCheck, _property.getAddress);