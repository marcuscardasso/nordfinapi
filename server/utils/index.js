const basePath = process.cwd();
import fs from 'fs';
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticator = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyelellegdgdhegfh');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        
        if (!user) {
            throw new Error();
        }

        req.token = token
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

export default {
    authenticator
}