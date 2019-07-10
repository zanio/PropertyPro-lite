"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cloudinaryConfig = require("./config/cloudinaryConfig");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _index = _interopRequireDefault(require("./routes/routesjs/index.routes"));

var _index2 = _interopRequireDefault(require("./routes/routesdb/index.routes"));

// Import packages
var router = !process.env.type ? _index["default"] : _index2["default"]; // App

var app = (0, _express["default"])(); // Morgan

app.use((0, _morgan["default"])('tiny'));
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // First route

app.use(_express["default"].json());
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use('*', _cloudinaryConfig.cloudinaryConfig);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(router);
app.use('*', function (req, res) {
  res.status(404).json({
    status: 404,
    err: 'That routes is not a known route'
  });
}); // Starting server

var PORT = process.env.PORT || 3300;
app.listen(PORT, function () {
  var debug = require('debug')('http');

  debug('app is running on ' + PORT);
});
var _default = app;
exports["default"] = _default;