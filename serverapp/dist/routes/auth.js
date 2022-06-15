"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("../utils"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticator = _utils["default"].authenticator;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var router = _express["default"].Router();

var auth = router;
auth.post('/api/signup', body('firstname').isLength({
  min: 3
}), body('lastname').isLength({
  min: 3
}), body('email').isLength({
  min: 3
}), body('phonenumber').isLength({
  min: 3
}), body('accountPlan').isLength({
  min: 3
}), body('password').isLength({
  min: 3
}), body('confirmpassword').isLength({
  min: 3
}), body('email').isEmail(), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _user["default"](req.body);
            user.balance = 0.0;
            user.admin = false;
            user.accountNumber = user._id;
            _context.prev = 4;
            _context.next = 7;
            return user.save();

          case 7:
            _context.next = 9;
            return user.generateAuthToken();

          case 9:
            token = _context.sent;
            res.status(201).send({
              user: user,
              token: token
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);
            res.status(400).send({
              error: _context.t0
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
auth.post('/api/signupadmin/', body('firstname').isLength({
  min: 3
}), body('lastname').isLength({
  min: 3
}), body('email').isLength({
  min: 3
}), body('password').isLength({
  min: 3
}), body('confirmpassword').isLength({
  min: 3
}), body('email').isEmail(), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = new _user["default"](req.body);
            user.admin = true;
            user.accountNumber = user._id;
            _context2.prev = 3;
            _context2.next = 6;
            return user.save();

          case 6:
            _context2.next = 8;
            return user.generateAuthToken();

          case 8:
            token = _context2.sent;
            res.status(201).send({
              user: user,
              token: token
            });
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            res.status(400).send(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
auth.post('/api/signin', body('email').isLength({
  min: 3
}), body('password').isLength({
  min: 3
}), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var errors, user, token;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _user["default"].findByCredentials(req.body.email, req.body.password);

          case 6:
            user = _context3.sent;
            _context3.next = 9;
            return user.generateAuthToken();

          case 9:
            token = _context3.sent;
            res.send({
              user: user,
              token: token
            });
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            res.status(400).send({
              error: _context3.t0
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
auth.post('/api/signinadmin', body('email').isLength({
  min: 3
}), body('password').isLength({
  min: 3
}), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var errors, user, token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return _user["default"].findByCredentials(req.body.email, req.body.password);

          case 6:
            user = _context4.sent;
            _context4.next = 9;
            return user.generateAuthToken();

          case 9:
            token = _context4.sent;

            if (user.admin) {
              _context4.next = 12;
              break;
            }

            throw new Error();

          case 12:
            res.send({
              user: user,
              token: token
            });
            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            res.status(400).send({
              message: 'no such user'
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 15]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/api/logout', authenticator, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            req.user.tokens = req.user.tokens.filter(function (token) {
              return token.token !== req.token;
            });
            _context5.next = 4;
            return req.user.save();

          case 4:
            res.send({
              message: 'logged out'
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(500).send({
              message: "logout failed"
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = auth;
exports["default"] = _default;