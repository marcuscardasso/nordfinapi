"use strict";

var mongoose = require('mongoose');

var mitigateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    "default": false
  }
});
var Mitigate = mongoose.model('Mitigate', mitigateSchema);
module.exports = Mitigate;