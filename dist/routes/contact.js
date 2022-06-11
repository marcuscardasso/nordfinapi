"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("../utils"));

var _contact = _interopRequireDefault(require("../models/contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticator = _utils["default"].authenticator;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var router = _express["default"].Router();

var contact = router;
contact.post('/api/contact', body('email').isLength({
  min: 3
}), body('message').isLength({
  min: 5
}), body('name').isLength({
  min: 3
}), body('email').isEmail(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var contact;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contact = new _contact["default"](req.body);
            _context.prev = 1;
            _context.next = 4;
            return contact.save();

          case 4:
            res.status(201).send({
              message: "your message has been sent, you'll be contacted asap",
              contact: contact
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            res.status(400).send(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
contact.get('/api/contact', authenticator, function (req, res) {
  var user = req.user;

  if (user.admin) {
    _contact["default"].find().then(function (contacts) {
      res.status(201).send({
        contacts: contacts
      });
    });
  }
});
var _default = contact;
exports["default"] = _default;