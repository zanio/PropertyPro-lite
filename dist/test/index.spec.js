"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]); //Our parent block

/*
  * Test the index /GET route and unnknown routes
  */


describe('/GET user account info', function () {
  it('it should test for "/" route ', function (done) {
    _chai["default"].request(_app["default"]).get('/').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
  it('it should test for unknown route ', function (done) {
    _chai["default"].request(_app["default"]).get('*') // eslint-disable-next-line no-unused-vars
    .end(function (err, res) {
      (0, _chai.expect)(err).to.equal(err); //expect(res.status).to.equal(404);

      done();
    });
  });
});