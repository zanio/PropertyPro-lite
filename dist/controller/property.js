"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddress = exports.getAllFlaggedProperty = exports.getOneFlaggedProperty = exports.getAllPropertyOfUser = exports.createProperty = exports.updateProperty = exports.getOneProperty = exports.getTypeProperty = exports.flaggedProperty = exports.updatePropertyStatus = exports.getAllProperty = exports.reportProperty = exports.deleteProperty = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _db = require("../db");

var _helper = require("../helpers/helper");

/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
var createProperty =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, property_name, status, state, city, property_description, price, contact_person_number, address, proof, note, type, createQuery, values, _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, property_name = _req$body.property_name, status = _req$body.status, state = _req$body.state, city = _req$body.city, property_description = _req$body.property_description, price = _req$body.price, contact_person_number = _req$body.contact_person_number, address = _req$body.address, proof = _req$body.proof, note = _req$body.note, type = _req$body.type;
            createQuery = "INSERT INTO property(id,owner_id,\n\t\t status,state,city,type, price,property_name,property_description,contact_person_number,\n\t\taddress, proof,note,image_url,created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14, $15,$16) returning *";
            values = [(0, _helper.generateId)() + '1', req.body.token.userId, 'available', state, city, type, price, property_name, property_description, contact_person_number, address, proof, note, req.Image_url, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
            _context.prev = 3;
            _context.next = 6;
            return (0, _db.query)(createQuery, values);

          case 6:
            _ref2 = _context.sent;
            rows = _ref2.rows;
            console.log(rows[0]);
            return _context.abrupt("return", res.status(201).json({
              status: 201,
              data: {
                id: rows[0].id,
                owner_id: rows[0].owner_id,
                status: rows[0].status,
                state: rows[0].state,
                city: rows[0].city,
                type: rows[0].type,
                price: rows[0].price,
                address: rows[0].address,
                image_url: rows[0].image_url
              }
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: 'error occured during the process'
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function createProperty(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


exports.createProperty = createProperty;

var reportProperty =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, reason, description, experience, createQuery, values, _ref4, rows;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, reason = _req$body2.reason, description = _req$body2.description, experience = _req$body2.experience;
            createQuery = "INSERT INTO report(id,property_id,\n\t\treporter_id,reason,description,experience,created_date)\n      VALUES($1, $2, $3, $4, $5, $6,$7) returning *";
            values = [(0, _helper.generateId)() + '1', req.params.id, req.result.userId, reason, description, experience, (0, _moment["default"])(new Date())];
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _db.query)(createQuery, values);

          case 6:
            _ref4 = _context2.sent;
            rows = _ref4.rows;
            return _context2.abrupt("return", res.status(201).json({
              status: 201,
              data: rows[0]
            }));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", res.status(400).json(_context2.t0));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function reportProperty(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


exports.reportProperty = reportProperty;

var flaggedProperty =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var createQuery, queryAdmin, _ref6, rows, values, response;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            createQuery = "INSERT INTO flagged(id,\n\t\treport_id,admin_name,created_date)\n\t  VALUES($1, $2,$3) returning *";
            queryAdmin = "SELECT first_name,last_name,is_admin\n\tFROM users where id = $1";
            _context3.next = 4;
            return (0, _db.query)(queryAdmin, [req.result.userId]);

          case 4:
            _ref6 = _context3.sent;
            rows = _ref6.rows;
            values = [(0, _helper.generateId)(1), req.params.id, rows[0].first_name + ' ' + rows[0].last_name, (0, _moment["default"])(new Date())];
            _context3.prev = 7;

            if (!rows[0].is_admin) {
              _context3.next = 13;
              break;
            }

            _context3.next = 11;
            return (0, _db.query)(createQuery, values);

          case 11:
            response = _context3.sent;
            return _context3.abrupt("return", res.status(201).json({
              status: 201,
              data: response.rows[0]
            }));

          case 13:
            return _context3.abrupt("return", res.status(422).json({
              status: 422,
              error: 'Only an admin can flag a property'
            }));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](7);
            return _context3.abrupt("return", res.status(400).json(_context3.t0));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[7, 16]]);
  }));

  return function flaggedProperty(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


exports.flaggedProperty = flaggedProperty;

var getOneFlaggedProperty =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var queryreport, values, _ref8, rows;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            queryreport = "SELECT id,property_id,reason,description,experience,created_date \n\tFROM report where id = $1";
            values = [req.params.id];
            _context4.next = 4;
            return (0, _db.query)(queryreport, values);

          case 4:
            _ref8 = _context4.sent;
            rows = _ref8.rows;
            _context4.prev = 6;

            if (!rows[0].id) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              status: 200,
              data: rows[0]
            }));

          case 9:
            return _context4.abrupt("return", res.status(404).json({
              status: 404,
              error: 'The id does not match any flagged property'
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](6);
            return _context4.abrupt("return", res.status(400).send(_context4.t0));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 12]]);
  }));

  return function getOneFlaggedProperty(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


exports.getOneFlaggedProperty = getOneFlaggedProperty;

var getAllFlaggedProperty =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var queryreport, _ref10, rows, rowCount;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            queryreport = "SELECT * \n\tFROM report";
            _context5.next = 3;
            return (0, _db.query)(queryreport);

          case 3:
            _ref10 = _context5.sent;
            rows = _ref10.rows;
            rowCount = _ref10.rowCount;
            _context5.prev = 6;

            if (!rows[0]) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              status: 200,
              data: [rows, {
                rowCount: rowCount
              }]
            }));

          case 9:
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](6);
            return _context5.abrupt("return", res.status(400).json(_context5.t0));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 11]]);
  }));

  return function getAllFlaggedProperty(_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}();
/**
   * Get All property
   * @param {object} req 
   * @param {object} res 
   * @returns {object} property array
   */


exports.getAllFlaggedProperty = getAllFlaggedProperty;

var getAllProperty =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var findAllQuery, _ref12, rows, rowCount;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            findAllQuery = "SELECT id,property_name,property_description,status,state,city,price,\n\tcontact_person_number,contact_person_address,proof,type,created_date,image\n\t FROM property";
            _context6.prev = 1;
            _context6.next = 4;
            return (0, _db.query)(findAllQuery);

          case 4:
            _ref12 = _context6.sent;
            rows = _ref12.rows;
            rowCount = _ref12.rowCount;
            return _context6.abrupt("return", res.status(200).json({
              status: 200,
              data: [].concat((0, _toConsumableArray2["default"])(rows), [{
                rowCount: rowCount
              }])
            }));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);
            return _context6.abrupt("return", res.status(400).send(_context6.t0));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 10]]);
  }));

  return function getAllProperty(_x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}();
/**
   * Get All user property
   * @param {object} req 
   * @param {object} res 
   * @returns {object} property array
   */


exports.getAllProperty = getAllProperty;

var getAllPropertyOfUser =
/*#__PURE__*/
function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var findAllQuery, _ref14, rows, rowCount;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            findAllQuery = 'SELECT * FROM property WHERE owner_id = $1';
            _context7.prev = 1;
            _context7.next = 4;
            return (0, _db.query)(findAllQuery, [req.result.userId]);

          case 4:
            _ref14 = _context7.sent;
            rows = _ref14.rows;
            rowCount = _ref14.rowCount;
            return _context7.abrupt("return", res.status(200).json({
              status: 200,
              data: [].concat((0, _toConsumableArray2["default"])(rows), [{
                rowCount: rowCount
              }])
            }));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            return _context7.abrupt("return", res.status(400).json(_context7.t0));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10]]);
  }));

  return function getAllPropertyOfUser(_x13, _x14) {
    return _ref13.apply(this, arguments);
  };
}();
/**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */


exports.getAllPropertyOfUser = getAllPropertyOfUser;

var getOneProperty =
/*#__PURE__*/
function () {
  var _ref15 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var text, _ref16, rows;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            text = "SELECT id,property_name,status,state,city,price,property_description,\n\tcontact_person_number,contact_person_address,proof,type,created_date,image\n\t FROM property WHERE id = $1";
            _context8.prev = 1;
            _context8.next = 4;
            return (0, _db.query)(text, [req.params.id]);

          case 4:
            _ref16 = _context8.sent;
            rows = _ref16.rows;

            if (rows[0]) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              status: 404,
              error: 'That id property does not exist or has already been deleted'
            }));

          case 8:
            return _context8.abrupt("return", res.status(200).json({
              status: 200,
              data: rows[0]
            }));

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", res.status(400).send(_context8.t0));

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 11]]);
  }));

  return function getOneProperty(_x15, _x16) {
    return _ref15.apply(this, arguments);
  };
}();
/**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */


exports.getOneProperty = getOneProperty;

var getTypeProperty =
/*#__PURE__*/
function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(req, res) {
    var text, _ref18, rows;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            text = "SELECT id,property_name,status,state,city,price,property_description,\n\tcontact_person_number,contact_person_address,proof,type,created_date,image\n\t FROM property WHERE type = $1";
            _context9.prev = 1;
            _context9.next = 4;
            return (0, _db.query)(text, [req.type]);

          case 4:
            _ref18 = _context9.sent;
            rows = _ref18.rows;

            if (rows[0]) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              status: 404,
              error: 'invalid search query params'
            }));

          case 8:
            return _context9.abrupt("return", res.status(200).json({
              status: 200,
              data: rows
            }));

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](1);
            return _context9.abrupt("return", res.status(400).send(_context9.t0));

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 11]]);
  }));

  return function getTypeProperty(_x17, _x18) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getTypeProperty = getTypeProperty;

var getAddress =
/*#__PURE__*/
function () {
  var _ref19 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(req, res) {
    var text, _ref20, rows;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            text = "SELECT contact_person_address,city,state\n\t FROM property WHERE id = $1";
            _context10.prev = 1;
            _context10.next = 4;
            return (0, _db.query)(text, [req.params.id]);

          case 4:
            _ref20 = _context10.sent;
            rows = _ref20.rows;

            if (rows[0]) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.status(404).json({
              status: 404,
              error: 'No advert available with that id'
            }));

          case 8:
            return _context10.abrupt("return", res.status(200).json({
              status: 200,
              data: rows[0]
            }));

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10["catch"](1);
            return _context10.abrupt("return", res.status(400).send(_context10.t0));

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 11]]);
  }));

  return function getAddress(_x19, _x20) {
    return _ref19.apply(this, arguments);
  };
}();
/**
  * Update A Reflection
  * @param {object} req 
  * @param {object} res 
  * @returns {object} updated reflection
  */


exports.getAddress = getAddress;

var updateProperty =
/*#__PURE__*/
function () {
  var _ref21 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(req, res) {
    var findOneQuery, updateOneQuery, _ref22, rows, values, response;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            findOneQuery = 'SELECT * FROM property WHERE id=$1 AND owner_id = $2';
            updateOneQuery = "UPDATE property\n\t  SET property_name=$1,status=$2,state=$3,property_description=$4,\n\t  city=$5,price=$6,contact_person_number=$7,\n\t  contact_person_address=$8,proof=$9,note=$10,\n\t  modified_date=$11, image = $12\n\t  WHERE id=$13 AND owner_id = $14 returning *";
            _context11.prev = 2;
            _context11.next = 5;
            return (0, _db.query)(findOneQuery, [parseInt(req.params.id), req.result.userId.toString()]);

          case 5:
            _ref22 = _context11.sent;
            rows = _ref22.rows;
            console.log(req.result.userId, (0, _typeof2["default"])(parseInt(req.params.id)), rows);

            if (rows[0].id) {
              _context11.next = 10;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              status: 404,
              error: 'That id property does not exist or has already been deleted'
            }));

          case 10:
            values = [req.body.property_name || rows[0].property_name, rows[0].status, req.body.state || rows[0].state, req.body.property_description || rows[0].property_description, req.body.city || rows[0].city, req.body.price || rows[0].price, req.body.contact_person_number || rows[0].contact_person_number, req.body.contact_person_address || rows[0].address, req.body.proof || rows[0].proof, req.body.note || rows[0].note, (0, _moment["default"])(new Date()), req.image_url || rows[0].image_url, req.params.id, req.result.userId];
            _context11.next = 13;
            return (0, _db.query)(updateOneQuery, values);

          case 13:
            response = _context11.sent;
            return _context11.abrupt("return", res.status(200).json({
              status: 200,
              data: response.rows[0]
            }));

          case 17:
            _context11.prev = 17;
            _context11.t0 = _context11["catch"](2);
            console.log(_context11.t0);
            return _context11.abrupt("return", res.status(400).json({
              status: 400,
              error: 'error occured during the process'
            }));

          case 21:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 17]]);
  }));

  return function updateProperty(_x21, _x22) {
    return _ref21.apply(this, arguments);
  };
}();
/**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */


exports.updateProperty = updateProperty;

var updatePropertyStatus =
/*#__PURE__*/
function () {
  var _ref23 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12(req, res) {
    var findOneQuery, updateOneQuery, _ref24, rows, values, response;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            findOneQuery = 'SELECT * FROM property WHERE id=$1 AND owner_id = $2';
            updateOneQuery = "UPDATE property SET status=$1\n      WHERE id=$2 AND owner_id = $3 returning *";
            _context12.prev = 2;
            _context12.next = 5;
            return (0, _db.query)(findOneQuery, [req.params.id, req.result.userId]);

          case 5:
            _ref24 = _context12.sent;
            rows = _ref24.rows;

            if (rows[0]) {
              _context12.next = 9;
              break;
            }

            return _context12.abrupt("return", res.status(404).json({
              status: 404,
              error: 'invalid search query params'
            }));

          case 9:
            values = [req.body.status || rows[0].status, req.params.id, req.result.userId];
            _context12.next = 12;
            return (0, _db.query)(updateOneQuery, values);

          case 12:
            response = _context12.sent;
            return _context12.abrupt("return", res.status(200).json({
              status: 200,
              data: response.rows[0]
            }));

          case 16:
            _context12.prev = 16;
            _context12.t0 = _context12["catch"](2);
            return _context12.abrupt("return", res.status(400).json(_context12.t0));

          case 19:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[2, 16]]);
  }));

  return function updatePropertyStatus(_x23, _x24) {
    return _ref23.apply(this, arguments);
  };
}();
/**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */


exports.updatePropertyStatus = updatePropertyStatus;

var deleteProperty =
/*#__PURE__*/
function () {
  var _ref25 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(req, res) {
    var deleteQuery, _ref26, rows;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            deleteQuery = 'DELETE FROM property WHERE id=$1 AND owner_id = $2 returning *';
            _context13.prev = 1;
            _context13.next = 4;
            return (0, _db.query)(deleteQuery, [req.params.id, req.result.userId]);

          case 4:
            _ref26 = _context13.sent;
            rows = _ref26.rows;

            if (rows[0]) {
              _context13.next = 8;
              break;
            }

            return _context13.abrupt("return", res.status(404).json({
              status: 404,
              error: 'That id property does not exist or has already been deleted'
            }));

          case 8:
            return _context13.abrupt("return", res.status(204).json({
              status: 202,
              message: "The id ".concat(req.params.id, " has been succcessufully deleted")
            }));

          case 11:
            _context13.prev = 11;
            _context13.t0 = _context13["catch"](1);
            return _context13.abrupt("return", res.status(400).json(_context13.t0));

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 11]]);
  }));

  return function deleteProperty(_x25, _x26) {
    return _ref25.apply(this, arguments);
  };
}();

exports.deleteProperty = deleteProperty;