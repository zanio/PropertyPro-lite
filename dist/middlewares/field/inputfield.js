"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regNumCheck = exports.regCharCheck = exports.emailValidation = exports.checkPropertyEmpty = exports.genderCheck = exports.checkFieldsUser = exports.checkPropertyField = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _string = require("../../utils/string");

var _numRegex = require("../../utils/numRegex");

var _checkfloat = _interopRequireDefault(require("../../utils/checkfloat"));

var _multer = require("../../config/multer");

var _helper = require("../../helpers/helper");

var _email = require("../../utils/email");

var _error = require("../../usingJSObject/data/error");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

//import { newDate,getSubId } from './helper';
var _require = require('../../usingJSObject/data/users'),
    users = _require.users;

_dotenv["default"].config();

var checkPropertyField = function checkPropertyField(req, res, next) {
  var image_url = req.image_url,
      property = req.property,
      _float = req["float"];
  var boolArray = (0, _string.Arr)(property);
  var letterBolean = (0, _string.checkLetter)(boolArray);
  var floatBoolean = (0, _checkfloat["default"])(_float.price);

  if (!letterBolean) {
    res.status(403).json(_error.error.label_err_403);
  } else if (!floatBoolean) {
    res.status(403).json(_error.error.price_403);
  } else {
    req.price = parseFloat(_float.price);
    req.property = property;
    req.image_url = image_url;
    next();
  }
};

exports.checkPropertyField = checkPropertyField;

var checkFieldsUser = function checkFieldsUser(req, res, next) {
  var _req$body = req.body,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      password = _req$body.password,
      address = _req$body.address,
      email = _req$body.email,
      phone_number = _req$body.phone_number,
      gender = _req$body.gender;
  var is_Admin = req.is_Admin;
  var checkAdmin = is_Admin ? true : false;
  var id = {
    id: (0, _helper.getNewId)(users)
  };

  if (first_name && last_name && password && address && email && phone_number && gender) {
    var newPassword = null;
    (0, _helper.harshPassword)(password).then(function (result) {
      if (result) {
        newPassword = result;
        var namedata = {
          first_name: first_name,
          last_name: last_name
        };
        var newUserNotoken = (0, _objectSpread2["default"])({}, namedata, {
          email: email,
          password: newPassword,
          address: address,
          phone_number: phone_number,
          gender: gender,
          is_Admin: checkAdmin
        });

        var token = _jsonwebtoken["default"].sign((0, _objectSpread2["default"])({
          code: newPassword
        }, id, {
          newUserNotoken: newUserNotoken
        }), process.env.SECRET_KEY);

        var newUser = (0, _objectSpread2["default"])({
          token: token
        }, newUserNotoken);
        req.newUser = newUser;
        next();
      }
    });
  } else {
    res.status(403).json(_error.error.all_field_403);
    return;
  }
};

exports.checkFieldsUser = checkFieldsUser;

var genderCheck = function genderCheck(req, res, next) {
  var gender = req.body.gender;
  var genderCheck = gender === 'male' || gender === 'female' ? true : false;

  if (genderCheck) {
    next();
  } else {
    res.status(403).json(_error.error.gender_error_403);
    return;
  }
};

exports.genderCheck = genderCheck;

var checkPropertyEmpty = function checkPropertyEmpty(req, res, next) {
  try {
    (0, _multer.dataUri)(req);
    var _req$body2 = req.body,
        property_name = _req$body2.property_name,
        status = _req$body2.status,
        price = _req$body2.price,
        state = _req$body2.state,
        city = _req$body2.city,
        type = _req$body2.type,
        contact_person_number = _req$body2.contact_person_number,
        contact_person_address = _req$body2.contact_person_address,
        proof = _req$body2.proof,
        note = _req$body2.note;
    var image = req.file;

    if (status && city && state && property_name && price && image && type && contact_person_number && contact_person_address) {
      var property = {
        status: status,
        state: state,
        type: type
      };
      var image_url = {
        image: image
      };
      var _float2 = {
        price: price
      };
      var other_details = {
        contact_person_number: contact_person_number,
        city: city,
        contact_person_address: contact_person_address,
        proof: proof,
        note: note,
        property_name: property_name
      };
      req.property = property;
      req.image_url = image_url;
      req["float"] = _float2;
      req.other_details = other_details;
      next();
    } else {
      res.status(403).json(_error.error.all_field_403);
    }
  } catch (errors) {
    res.status(403).json(_error.error.input_image_403);
  }
};

exports.checkPropertyEmpty = checkPropertyEmpty;

var emailValidation = function emailValidation(req, res, next) {
  var email = req.body.email;

  if ((0, _email.validateEmail)(email) && email) {
    next();
  } else {
    res.status(402).json(_error.error.invalid_email_402);
    return;
  }
};

exports.emailValidation = emailValidation;

var regCharCheck = function regCharCheck(req, res, next) {
  var _req$body3 = req.body,
      newUser = _req$body3.newUser,
      first_name = _req$body3.first_name,
      last_name = _req$body3.last_name;
  var namedata = {
    first_name: first_name,
    last_name: last_name
  };
  var boolArray = (0, _string.Arr)(namedata);
  var letterBolean = (0, _string.checkLetter)(boolArray);

  if (letterBolean) {
    req.newUser = newUser;
    next();
  } else {
    res.status(404).json(_error.error.string_err_403);
    return;
  }
};

exports.regCharCheck = regCharCheck;

var regNumCheck = function regNumCheck(req, res, next) {
  var newUser = req.newUser;
  var numInfo = newUser.phone_number;
  var numRex = (0, _numRegex.numRegex)(numInfo);
  var lengthNum = (0, _numRegex.phoneLength)(numInfo);

  if (numRex && lengthNum) {
    req.newUser = newUser;
    next();
  } else {
    res.status(404).json(_error.error.interger_err_404);
    return;
  }
};

exports.regNumCheck = regNumCheck;