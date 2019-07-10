"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyrouter = void 0;

var _multer = require("../../config/multer");

var _cloudinary = require("../../config/cloudinary");

var _auth = require("../../middlewares/auth/auth");

var _jsonweb = require("../../middlewares/auth/jsonweb");

var _inputfield = require("../../middlewares/field/inputfield");

var _property = require("../../usingDb/controller/property");

var express = require('express');

var propertyrouter = express.Router();
exports.propertyrouter = propertyrouter;

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _property.createProperty);
propertyrouter.patch('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _multer.multerUploads, _inputfield.checkPropertyEmpty, _inputfield.checkPropertyField, _cloudinary.cloudinaryHandler, _property.updateProperty);
propertyrouter.patch('/property-advert/:id/sold', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.updatePropertyStatus);
propertyrouter["delete"]('/property-advert/:id', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.deleteProperty);
propertyrouter.get('/property-advert', _property.getAllProperty);
propertyrouter.get('/property-advert/user', _auth.authorization, _jsonweb.jwtVerify, _property.getAllPropertyOfUser);
propertyrouter.post('/property-advert/:id/report', _auth.idCheck, _auth.authorization, _jsonweb.jwtVerify, _property.reportProperty);
propertyrouter.get('/property-advert/search', _auth.typeAdvert, _property.getTypeProperty);
propertyrouter.get('/property-advert/:id', _auth.idCheck, _property.getOneProperty);
propertyrouter.get('/property-advert/flagged/:id', _auth.idCheck, _property.getOneFlaggedProperty);
propertyrouter.get('/flagged', _property.getAllFlaggedProperty);
propertyrouter.get('/property-advert/address/:id', _auth.idCheck, _property.getAddress);