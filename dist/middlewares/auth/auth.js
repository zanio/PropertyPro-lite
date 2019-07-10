"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleIdProperty = exports.toDeleteId = exports.idCheck = exports.getPreviousId = exports.AdminCheck = exports.uniqueValue = exports.isSignUp = exports.getId = exports.authorization = exports.AdminCheckDb = exports.typeAdvert = exports.mustBeInteger = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _admin = require("../../usingJSObject/data/admin");

var _helper = require("../../helpers/helper");

var _numRegex = require("../../utils/numRegex");

var _error = require("../../usingJSObject/data/error");

var _db = require("../../usingDb/db");

var _url = _interopRequireDefault(require("url"));

/* eslint-disable no-console */
var authorization = function authorization(req, res, next) {
  var header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    var token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(401).json(_error.error.autthorization_401);
  }
};

exports.authorization = authorization;

var mustBeInteger = function mustBeInteger(req, res, next) {
  var id = req.params.id;

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({
      message: 'ID must be an integer'
    });
  } else {
    next();
  }
};

exports.mustBeInteger = mustBeInteger;

var uniqueValue = function uniqueValue(req, res, next) {
  var email = req.body.email;

  var _require = require('../../usingJSObject/data/users.js'),
      users = _require.users;

  users = users.find(function (r) {
    return r.email === email;
  });

  if (!users) {
    next();
  } else {
    res.status(403).json(_error.error.uniquevalue_403);
    return;
  }
};

exports.uniqueValue = uniqueValue;

var isSignUp = function isSignUp(req, res, next) {
  var _require2 = require('../../usingJSObject/data/users.js'),
      users = _require2.users;

  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  var is_Admin = req.is_Admin;
  var checkAdmin = is_Admin ? true : false; // eslint-disable-next-line no-unused-vars

  var id;
  users = users.find(function (r) {
    return r.email === email;
  });
  users ? users.is_Admin = checkAdmin : null;

  if (users) {
    (0, _helper.comparePassword)(users.password, password).then(function (bool) {
      if (bool) {
        id = users.id;
        req.user = users;
        next();
      } else {
        res.status(403).json(_error.error.email_password_403);
      }
    });
  } else {
    res.status(403).json(_error.error.reg_new_403);
    return;
  }
};

exports.isSignUp = isSignUp;

var getId = function getId(req, res, next) {
  var result = req.result;

  var _require3 = require('../../usingJSObject/data/users.js'),
      users = _require3.users,
      dbAdvert = _require3.dbAdvert;

  var owner = {
    owner: result.id
  };
  var date = {
    createdAt: (0, _helper.newDate)()
  };
  users = users.find(function (r) {
    return r.id === users.id;
  });
  var property = req.property,
      price = req.price,
      other_details = req.other_details,
      Image_url = req.Image_url;
  var existingUser = users ? {
    first_name: users['first_name'],
    last_name: users['last_name'],
    address: users['address']
  } : null;
  var data = (0, _objectSpread2["default"])({
    id: (0, _helper.getSubId)(dbAdvert)
  }, owner, property, {
    price: price
  }, date, other_details, {
    Image_url: Image_url
  }, existingUser);

  if (owner) {
    req.data = data;
    next();
  } else {
    res.status(403).json(_error.error.unauthorized_post_403);
  }
};

exports.getId = getId;

var getPreviousId = function getPreviousId(req, res, next) {
  var _require4 = require('../../usingJSObject/data/users.js'),
      dbAdvert = _require4.dbAdvert;

  var result = req.result;
  var owner = {
    owner: result.id
  }; //const date = { Updat: newDate()}; 

  dbAdvert = dbAdvert.find(function (r) {
    return r.id == req.params.id;
  });
  var property = req.property,
      price = req.price,
      other_details = req.other_details,
      Image_url = req.Image_url;
  dbAdvert = dbAdvert ? {
    status: dbAdvert['status'] = property.status,
    state: dbAdvert['state'] = property.state,
    type: dbAdvert['type'] = property.type,
    contact_person_number: dbAdvert['contact_person_number'] = other_details.contact_person_number,
    city: dbAdvert['city'] = other_details.city,
    contact_person_address: dbAdvert['contact_person_address'] = other_details.contact_person_address,
    proof: dbAdvert['proof'] = other_details.proof,
    note: dbAdvert['note'] = other_details.note,
    property_name: dbAdvert['property_name'] = other_details.property_name,
    price: dbAdvert['price'] = price,
    Image_url: dbAdvert['Image_url'] = Image_url
  } : null;
  var data = (0, _objectSpread2["default"])({}, dbAdvert);

  if (owner && dbAdvert) {
    req.data = data;
    next();
  } else {
    res.status(403).json(_error.error.unauthorized_post_403);
  }
};

exports.getPreviousId = getPreviousId;

var getSingleIdProperty = function getSingleIdProperty(req, res, next) {
  var _require5 = require('../../usingJSObject/data/users.js'),
      dbAdvert = _require5.dbAdvert;

  var result = req.result;
  var owner = {
    owner: result.id
  };
  dbAdvert = dbAdvert.find(function (r) {
    return r.id == req.params.id;
  });
  var status = req.body.status;
  dbAdvert['status'] = status;
  var data = (0, _objectSpread2["default"])({}, dbAdvert);

  if (owner && dbAdvert) {
    req.data = data;
    next();
  } else {
    res.status(403).json(_error.error.unauthorized_post_403);
  }
};

exports.getSingleIdProperty = getSingleIdProperty;

var toDeleteId = function toDeleteId(req, res, next) {
  var _require6 = require('../../usingJSObject/data/users.js'),
      dbAdvert = _require6.dbAdvert;

  var result = req.result;
  var owner = {
    owner: result.id
  }; //const date = { Updat: newDate()}; 

  dbAdvert = dbAdvert.find(function (r) {
    return r.id == req.params.id;
  });

  if (owner && dbAdvert) {
    next();
  } else {
    res.status(404).json(_error.error.no_advert_delete_404);
  }
};

exports.toDeleteId = toDeleteId;

var AdminCheck = function AdminCheck(req, res, next) {
  var email = req.body.email;
  (0, _helper.adminDb)(_admin.admins, email).then(function (result) {
    if (result) {
      req.is_Admin = result.is_Admin;
      next();
    } else {
      next();
    }
  });
};

exports.AdminCheck = AdminCheck;

var AdminCheckDb =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var adminSelectQuery, email, _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adminSelectQuery = 'SELECT * FROM admins WHERE email = $1';
            email = req.body.email;
            _context.next = 4;
            return (0, _db.query)(adminSelectQuery, [email]);

          case 4:
            _ref2 = _context.sent;
            rows = _ref2.rows;

            if (rows.length !== 0) {
              req.is_admin = 'True';
              next();
            } else {
              req.is_admin = 'False';
              next();
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function AdminCheckDb(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.AdminCheckDb = AdminCheckDb;

var idCheck = function idCheck(req, res, next) {
  var id = req.params.id;

  if ((0, _numRegex.numRegex)(id)) {
    next();
  } else {
    res.status(404).json(_error.error.id_number_404);
  }
};

exports.idCheck = idCheck;

var typeAdvert = function typeAdvert(req, res, next) {
  var url_parts = _url["default"].parse(req.url, true).query;

  if (url_parts.type) {
    req.type = url_parts.type;
    next();
  } else {
    res.status(404).json(_error.error.id_number_404);
  }
};

exports.typeAdvert = typeAdvert;