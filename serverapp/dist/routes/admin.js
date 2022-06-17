"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("../utils"));

var _user2 = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticator = _utils["default"].authenticator;

var router = _express["default"].Router();

var admin = router;
admin.get('/api/admingetuser', authenticator, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, id, _user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            id = req.query.id;

            if (!user.admin) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return _user2["default"].findOne({
              _id: id
            });

          case 5:
            _user = _context.sent;
            res.send({
              message: 'user',
              user: _user
            });
            _context.next = 10;
            break;

          case 9:
            res.send({
              message: 'not admin'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
admin.get('/api/getusers', authenticator, function (req, res) {
  var user = req.user;

  if (user.admin) {
    _user2["default"].find().then(function (users) {
      res.status(201).send({
        users: users
      });
    });
  }
});
admin.patch('/api/patchuser', authenticator, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var admin, userid;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            admin = req.user;

            if (admin.admin) {
              userid = req.query.userid;

              _user2["default"].findById(userid).then( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
                  var updates, allowedUpdates, isValidOperation;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          updates = Object.keys(req.body);
                          allowedUpdates = ['accountPlan', 'balance', 'requirement', 'notifications', 'transactions'];
                          isValidOperation = updates.every(function (update) {
                            return allowedUpdates.includes(update);
                          });

                          if (isValidOperation) {
                            _context2.next = 5;
                            break;
                          }

                          return _context2.abrupt("return", res.status(400).send({
                            error: 'Invalid updates!'
                          }));

                        case 5:
                          _context2.prev = 5;
                          updates.forEach(function (update) {
                            if (update === 'transactions') {
                              var transactions = req.body.transactions;

                              if (transactions.length) {
                                var transacs = user.transactions;
                                user.transactions = [].concat(_toConsumableArray(transacs), _toConsumableArray(transactions));
                              }
                            } else if (update === 'notifications') {
                              var notifications = req.body.notifications;

                              if (notifications.length) {
                                var notifs = user.notifications;
                                user.notifications = [].concat(_toConsumableArray(notifs), _toConsumableArray(notifications));
                              }
                            } else {
                              user[update] = req.body[update];
                            }
                          });
                          _context2.next = 9;
                          return user.save();

                        case 9:
                          res.send({
                            user_updated: user
                          });
                          _context2.next = 16;
                          break;

                        case 12:
                          _context2.prev = 12;
                          _context2.t0 = _context2["catch"](5);
                          console.log(_context2.t0);
                          res.status(400).send(_context2.t0);

                        case 16:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[5, 12]]);
                }));

                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = admin;
exports["default"] = _default;