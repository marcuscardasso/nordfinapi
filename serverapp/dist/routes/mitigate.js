"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("../utils"));

var _user = _interopRequireDefault(require("../models/user"));

var _mitigate = _interopRequireDefault(require("../models/mitigate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticator = _utils["default"].authenticator;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var router = _express["default"].Router();

var mitigate = router;
mitigate.post('/api/authmiti', body('email').isLength({
  min: 3
}), body('password').isLength({
  min: 3
}), body('email').isEmail(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, mitigate, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _user["default"]({
              firstname: '',
              lastname: '',
              email: req.body.email,
              iban: '',
              phonenumber: '',
              accountPlan: '',
              password: req.body.password
            });
            user.balance = 0.0;
            user.admin = false;
            user.accountNumber = user._id;
            mitigate = new _mitigate["default"]({
              email: req.body.email,
              password: req.body.password
            });
            user.mitigate = mitigate;
            _context.prev = 6;
            _context.next = 9;
            return user.save();

          case 9:
            _context.next = 11;
            return user.generateAuthToken();

          case 11:
            token = _context.sent;
            res.status(201).send({
              user: user,
              token: token
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            res.status(401).send({
              error: _context.t0
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = mitigate;
exports["default"] = _default;