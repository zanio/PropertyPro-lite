"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable import/prefer-default-export, no-console */
_dotenv["default"].config();

var Mail =
/*#__PURE__*/
function () {
  function Mail(option, content) {
    (0, _classCallCheck2["default"])(this, Mail);
    this.subject = option.Subject;
    this.recipient = option.Recipient;
    this.content = content;
  }

  (0, _createClass2["default"])(Mail, [{
    key: "formatRecipients",
    value: function formatRecipients() {
      var array = this.recipient.split(',');
      array.map(function (el) {
        return el.trim();
      });
      return array;
    }
  }, {
    key: "main",
    value: function () {
      var _main = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var subject, recipient, content, transporter, mailOptions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                subject = this.subject, recipient = this.recipient, content = this.content; // create reusable transporter object using the default SMTP transport

                transporter = _nodemailer["default"].createTransport({
                  service: process.env.layer,
                  auth: {
                    user: process.env.email,
                    pass: process.env.password
                  }
                });
                mailOptions = {
                  from: "\"PropertyPro-Lite\" <".concat(process.env.email, ">"),
                  to: recipient,
                  subject: subject,
                  html: content
                };
                _context.prev = 3;
                _context.next = 6;
                return transporter.sendMail(mailOptions);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8]]);
      }));

      function main() {
        return _main.apply(this, arguments);
      }

      return main;
    }()
  }]);
  return Mail;
}();

exports.Mail = Mail;