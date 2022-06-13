"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("../utils"));

var _user2 = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticator = _utils["default"].authenticator;

var router = _express["default"].Router();

var user = router;
user.patch('/api/edituser', authenticator, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var updates, allowedUpdates, isValidOperation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updates = Object.keys(req.body);
            console.log(req.body);
            allowedUpdates = ['firstname', 'lastname', 'email', 'phonenumber'];
            isValidOperation = updates.every(function (update) {
              return allowedUpdates.includes(update);
            });

            if (isValidOperation) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              error: 'Invalid updates!'
            }));

          case 6:
            _context.prev = 6;
            updates.forEach(function (update) {
              return req.user[update] = req.body[update];
            });
            _context.next = 10;
            return req.user.save();

          case 10:
            res.send(req.user);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](6);
            res.status(400).send(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
user.get('/api/getuser', authenticator, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return res.send({
              message: 'user',
              user: req.user,
              token: req.token
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
user.post('/api/request', authenticator, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body, user = req.user;
            user.requests.push(body);
            _context3.prev = 2;
            _context3.next = 5;
            return user.save();

          case 5:
            res.send({
              message: 'request sent',
              user: user
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);
            res.status(400).send(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
user.patch('/api/edituserpw', authenticator, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, email, oldpassword, newpassword, _user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, oldpassword = _req$body.oldpassword, newpassword = _req$body.newpassword;
            _context4.prev = 1;
            _context4.next = 4;
            return _user2["default"].findByCredentials(email, oldpassword);

          case 4:
            _user = _context4.sent;

            if (_user) {
              _user.password = newpassword;

              _user.save();

              res.status(201).send({
                message: "password changed",
                user: _user
              });
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.status(400).send({
              message: "wrong password"
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = user;
exports["default"] = _default;