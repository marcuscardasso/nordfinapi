"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ProtonMail = require('protonmail-api');

var router = _express["default"].Router();

var email = router;
email.get('/api/triggermail', function (req, res) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var pm;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ProtonMail.connect({
              username: "marcuscardosso@protonmail.com",
              password: "7x5fPF7zfBmfkuB"
            });

          case 2:
            pm = _context.sent;
            _context.next = 5;
            return pm.sendEmail({
              to: 'nerdyemmanuel@gmail.com',
              subject: 'Send email tutorial',
              body: 'Hello world'
            });

          case 5:
            pm.close();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))().then(function () {
    console.log('email sent successfully');
    res.status(200).send({
      message: 'email sent sucessfully'
    });
  })["catch"](function (err) {
    console.log(err, 'there is a failure');
  });
});
var _default = email;
exports["default"] = _default;