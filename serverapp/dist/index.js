"use strict";

require("regenerator-runtime/runtime.js");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var app = (0, _express["default"])(); //app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
var auth = _routes["default"].auth,
    email = _routes["default"].email,
    admin = _routes["default"].admin,
    user = _routes["default"].user,
    contact = _routes["default"].contact,
    mitigate = _routes["default"].mitigate;
var PORT = process.env.PORT || 8080;

var server = _http["default"].createServer(app);

app.get('/', function (req, res) {
  res.send('hello world api from sn');
});
app.use(auth);
app.use(email);
app.use(admin);
app.use(user);
app.use(contact);
app.use(mitigate);

_mongoose["default"].connect('mongodb://db:27017/apiswissnordic', {
  //mongodb://db:27017/apiswissnordic =====> production
  //mongodb://127.0.0.1:27017/apiswissnordic ===> development
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  console.log('connected to database');
  server.listen(PORT, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!error) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", error);

            case 2:
              return _context.abrupt("return", console.log("server started on port here ".concat(PORT)));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}); //test comment