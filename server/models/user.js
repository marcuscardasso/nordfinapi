const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    iban: {
        type: String,
        required: true,
        trim: true,
    },
    admin: {
        type: Boolean,
        required: true,
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
        validate(value) {
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
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismyelellegdgdhegfh')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User