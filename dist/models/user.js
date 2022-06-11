"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  admin: {
    type: Boolean,
    required: true
  },
  phonenumber: {
    type: String,
    unique: true,
    required: false,
    trim: true,
    lowercase: true
  },
  accountPlan: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  accountNumber: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: function validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  balance: {
    type: Number,
    required: false,
    trim: true,
    lowercase: true
  },
  requirement: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  notifications: [{
    notifdate: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    notifcontent: {
      type: String
    },
    viewed: {
      type: Boolean
    }
  }],
  requests: [{}],
  transactions: [{
    dateTime: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    amount: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    transactionType: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    fee: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    total: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    },
    transactionId: {
      type: String,
      required: false,
      trim: true,
      lowercase: true
    }
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var user, token;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, 'thisismyelellegdgdhegfh');
          user.tokens = user.tokens.concat({
            token: token
          });
          _context.next = 5;
          return user.save();

        case 5:
          return _context.abrupt("return", token);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

userSchema.statics.findByCredentials = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password) {
    var user, isMatch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              email: email
            });

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 5;
              break;
            }

            throw new Error('Unable to login');

          case 5:
            _context2.next = 7;
            return bcrypt.compare(password, user.password);

          case 7:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 10;
              break;
            }

            throw new Error('Unable to login');

          case 10:
            return _context2.abrupt("return", user);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); // Hash the plain text password before saving


userSchema.pre('save', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(next) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = this;

            if (!user.isModified('password')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return bcrypt.hash(user.password, 8);

          case 4:
            user.password = _context3.sent;

          case 5:
            next();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()); // Delete user tasks when user is removed

userSchema.pre('remove', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(next) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = this;
            _context4.next = 3;
            return Task.deleteMany({
              owner: user._id
            });

          case 3:
            next();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
var User = mongoose.model('User', userSchema);
module.exports = User;