"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _test = _interopRequireDefault(require("./test.js"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _path = require("path");

var _cloudinaryConfig = require("./config/cloudinaryConfig");

var _multer = require("./middleware/multer");

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */
var yourName = 'this just an example of a next generation code';
var app = (0, _express["default"])();
var Port = process.env.PORT || 3000; //app.use(express.static(resolve(__dirname, 'src/public')));

app.use((0, _bodyParser.urlencoded)({
  extended: false
}));
app.use((0, _bodyParser.json)());
app.use('*', _cloudinaryConfig.cloudinaryConfig);
app.get('/*', function (req, res) {
  return res.sendFile((0, _path.resolve)(__dirname, '../public/index.html'));
});
app.post('/upload', _multer.multerUploads, function (req, res) {
  if (req.file) {
    var file = (0, _multer.dataUri)(req).content;
    return _cloudinaryConfig.uploader.upload(file).then(function (result) {
      var image = result.url;
      result.tags.push('screenshot');
      result.public_id = 'api/screen';
      return res.status(200).json({
        messge: 'Your image has been uploded successfully to cloudinary',
        data: {
          image: image,
          result: result
        }
      });
    })["catch"](function (err) {
      return res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err: err
        }
      });
    });
  }
}); // email verification
//https://codeforgeek.com/node-email-verification-script/

app.listen(Port, function () {
  return console.log("Server started at http://localhost:".concat(Port));
});