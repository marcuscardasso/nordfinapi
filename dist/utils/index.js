"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var basePath = process.cwd();

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var findUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var email, phonenumber, password, id, promise, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, phonenumber = _ref.phonenumber, password = _ref.password, id = _ref.id;
            promise = new Promise(function (resolve, reject) {
              _fs["default"].readFile("".concat(basePath, "/db/index.json"), 'utf8', function (err, data) {
                if (err) {
                  return;
                }

                var db = data;
                var dbjs = JSON.parse(db);
                var dbjs_users = dbjs.users;

                if (email && !phonenumber) {
                  var hasUser = dbjs_users.filter(function (item) {
                    return item.email === email && item.password === password;
                  });

                  if (hasUser.length) {
                    resolve({
                      message: "You're signed in successfully",
                      user: hasUser[0]
                    });
                  } else {
                    reject('wrong details. Please sign up');
                  }
                }

                if (!email && phonenumber) {
                  var _hasUser = dbjs_users.filter(function (item) {
                    return item.phonenumber === phonenumber;
                  });

                  if (_hasUser.length) {
                    resolve({
                      message: "You're signed in successfully",
                      user: _hasUser[0]
                    });
                  } else {
                    reject('wrong details. Please sign up');
                  }
                }

                if (id && !email) {
                  var _hasUser2 = dbjs_users.filter(function (item) {
                    return "".concat(item.id) === id;
                  });

                  if (_hasUser2.length) {
                    resolve({
                      message: "user found",
                      user: _hasUser2[0]
                    });
                  } else {
                    reject('wrong details. Please sign up');
                  }
                }
              });
            });
            _context.next = 4;
            return promise;

          case 4:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var authenticator = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.header('Authorization').replace('Bearer ', '');
            decoded = jwt.verify(token, 'thisismyelellegdgdhegfh');
            _context2.next = 5;
            return User.findOne({
              _id: decoded._id,
              'tokens.token': token
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            throw new Error();

          case 8:
            req.token = token;
            req.user = user;
            next();
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            res.status(401).send({
              error: 'Please authenticate.'
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function authenticator(_x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  findUser: findUser,
  authenticator: authenticator
};
exports["default"] = _default;