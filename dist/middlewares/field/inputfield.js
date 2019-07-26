"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateprice = exports.regNumCheck = exports.regCharCheck = exports.emailValidation = exports.checkPropertyEmpty = exports.genderCheck = exports.checkPropertyField = void 0;

var _string = require("../../utils/string");

var _numRegex = require("../../utils/numRegex");

var _checkfloat = _interopRequireDefault(require("../../utils/checkfloat"));

var _multer = require("../../config/multer");

var _email = require("../../utils/email");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var checkPropertyField = function checkPropertyField(req, res, next) {
  var image_url = req.image_url,
      property = req.property,
      _float = req["float"];
  var boolArray = (0, _string.Arr)(req.property);
  var letterBolean = (0, _string.checkLetter)(boolArray);
  var floatBoolean = (0, _checkfloat["default"])(req["float"].price);
  console.log(req.body.token, ' this is the token that is to be used for authentication', req.image_url);

  if (!letterBolean) {
    console.log(req.image_url, 'letter boolean');
    res.status(403).json({
      status: 403,
      error: 'the property information can only contain aphabetic character'
    });
  } else if (!floatBoolean) {
    console.log(image_url, 'float boolean');
    res.status(403).json({
      status: 403,
      error: 'price value can only be numbers or floating numbers'
    });
  } else {
    req.price = parseFloat(req["float"].price);
    req.image_url = image_url;
    next();
  }
};

exports.checkPropertyField = checkPropertyField;

var genderCheck = function genderCheck(req, res, next) {
  var gender = req.body.gender;
  var genderCheck = gender === 'male' || gender === 'female' ? true : false;

  if (genderCheck || !gender) {
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'gender can only be male or female values'
    });
    return;
  }
};

exports.genderCheck = genderCheck;

var checkPropertyEmpty = function checkPropertyEmpty(req, res, next) {
  try {
    var _req$body = req.body,
        property_name = _req$body.property_name,
        token = _req$body.token,
        status = _req$body.status,
        price = _req$body.price,
        state = _req$body.state,
        city = _req$body.city,
        type = _req$body.type,
        contact_person_number = _req$body.contact_person_number,
        address = _req$body.address,
        proof = _req$body.proof,
        note = _req$body.note;
    var image_url = req.files['image_url'][0];
    var images_url = req.files['images_url'];
    property_name = property_name ? property_name.trim() : null;
    status = status ? status.trim() : null;
    price = price ? price.trim() : null;
    state = state ? state.trim() : null;
    city = city ? city.trim() : null;
    type = type ? type.trim() : null;
    address = address ? address.trim() : null;
    proof = proof ? proof.trim() : null;
    note = note ? note.trim() : null;
    console.log(images_url);

    if (city && state && price && image_url && type && address) {
      var property = {
        state: state,
        type: type,
        city: city
      };
      var _image_url = _image_url;
      var _float2 = {
        price: price
      };
      var other_details = {
        contact_person_number: contact_person_number,
        city: city,
        address: address,
        proof: proof,
        note: note,
        property_name: property_name
      };
      req.property = property;
      req.image_url = _image_url;
      req["float"] = _float2;
      req.other_details = other_details;
      next();
    } else {
      res.status(403).json({
        status: 403,
        error: 'please fill all filled correctly'
      });
    }
  } catch (errors) {
    res.status(403).json({
      status: 403,
      error: 'please fill all filled correctly and upload an image'
    });
  }
};

exports.checkPropertyEmpty = checkPropertyEmpty;

var updateprice = function updateprice(req, res, next) {
  var _req$body2 = req.body,
      token = _req$body2.token,
      price = _req$body2.price;

  if (price) {
    var _float3 = {
      price: price
    };
    req["float"] = _float3;
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'please fill in the exact price'
    });
  }
};

exports.updateprice = updateprice;

var emailValidation = function emailValidation(req, res, next) {
  var email = req.body.email;

  if ((0, _email.validateEmail)(email) && email) {
    next();
  } else {
    res.status(422).json({
      status: 422,
      error: 'invalid email validation'
    });
    return;
  }
};

exports.emailValidation = emailValidation;

var regCharCheck = function regCharCheck(req, res, next) {
  var _req$body3 = req.body,
      newUser = _req$body3.newUser,
      first_name = _req$body3.first_name,
      last_name = _req$body3.last_name;
  first_name = first_name ? first_name.trim() : null, last_name = last_name ? last_name.trim() : null;
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
    res.status(404).json({
      status: 404,
      error: 'first_name and last_name can only be letter characters'
    });
    return;
  }
};

exports.regCharCheck = regCharCheck;

var regNumCheck = function regNumCheck(req, res, next) {
  var phone_number = req.body.phone_number;
  phone_number = phone_number ? phone_number.trim() : null;
  var numRex = (0, _numRegex.numRegex)(phone_number);
  var lengthNum = (0, _numRegex.phoneLength)(phone_number);

  if (numRex & lengthNum) {
    next();
  } else {
    res.status(422).json({
      status: 422,
      error: 'phone number can only be digits with 11 characters and less than 13 characters'
    });
    return;
  }
};

exports.regNumCheck = regNumCheck;