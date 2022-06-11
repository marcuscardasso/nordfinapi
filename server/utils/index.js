const basePath = process.cwd();
import fs from 'fs';
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const findUser = async ({email, phonenumber, password, id}) => {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(`${basePath}/db/index.json`, 'utf8' , (err, data) => {
            if (err) {
                return
            }
    
            const db = data;
            const dbjs = JSON.parse(db)
            const dbjs_users = dbjs.users;
    
            if (email && !phonenumber) {
                const hasUser = dbjs_users.filter(item => item.email === email &&
                    item.password === password
                    );
    
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
                const hasUser = dbjs_users.filter(item => item.phonenumber === phonenumber);
    
                if (hasUser.length) {
                    resolve({
                        message: "You're signed in successfully",
                        user: hasUser[0]
                    });
                } else {
                    reject('wrong details. Please sign up');
                }
            }

            if (id && !email) {
                const hasUser = dbjs_users.filter(item => `${item.id}` === id);
    
                if (hasUser.length) {
                    resolve({
                        message: "user found",
                        user: hasUser[0]
                    });
                } else {
                    reject('wrong details. Please sign up');
                }
            }
        });
    });

    let result = await promise;
    return result;
}

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
    findUser,
    authenticator
}