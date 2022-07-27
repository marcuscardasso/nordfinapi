"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _email = _interopRequireDefault(require("./email"));

var _admin = _interopRequireDefault(require("./admin"));

var _user = _interopRequireDefault(require("./user"));

var _contact = _interopRequireDefault(require("./contact"));

var _mitigate = _interopRequireDefault(require("./mitigate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  auth: _auth["default"],
  email: _email["default"],
  admin: _admin["default"],
  user: _user["default"],
  contact: _contact["default"],
  mitigate: _mitigate["default"]
};
exports["default"] = _default;