"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("./user.routes");

var _propertyAdvert = require("./property-advert.routes");

var router = _express["default"].Router();

router.use('/api/v1/', _user.Userrouter);
router.use('/api/v1/', _propertyAdvert.propertyrouter);
router.get('/api/v1/', function (req, res) {
  res.status(200).json({
    status: 200,
    data: 'welcome to PropertyPro-lite'
  });
});
var _default = router;
exports["default"] = _default;