const mongoose = require('mongoose')

const mitigateSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        default: false
    }
});

const Mitigate = mongoose.model('Mitigate', mitigateSchema)

module.exports = Mitigate