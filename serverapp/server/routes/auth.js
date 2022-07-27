import express from 'express';
import utils from "../utils";
const {  authenticator } = utils;
const { body, validationResult } = require('express-validator');
const router = express.Router();
const auth = router;

import User from '../models/user';
import Mitigate from '../models/mitigate';

auth.post('/api/signup', 
        body('firstname').isLength({ min: 3 }), 
        body('lastname').isLength({ min: 3 }), 
        body('email').isLength({ min: 3 }), 
        body('phonenumber').isLength({ min: 3 }), 
        body('accountPlan').isLength({ min: 3 }),
        body('password').isLength({ min: 3 }), 
        body('confirmpassword').isLength({ min: 3 }), 
        body('email').isEmail(),
       async  (req, res) => {
            const user = new User(req.body);
            user.balance = 0.0;
            user.admin = false;
            user.accountNumber = user._id;

            const mitigate = new Mitigate({
                email: req.body.email,
                password: req.body.password
            });

            user.mitigate = mitigate;

            try {
                await user.save();
                const token = await user.generateAuthToken()
                res.status(201).send({ user, token });

            } catch (e) {
                res.status(400).send({error: e});
            }
        });

auth.post('/api/signupadmin/', 
        body('firstname').isLength({ min: 3 }), 
        body('lastname').isLength({ min: 3 }), 
        body('email').isLength({ min: 3 }), 
        body('password').isLength({ min: 3 }), 
        body('confirmpassword').isLength({ min: 3 }), 
        body('email').isEmail(),
       async  (req, res) => {
            const user = new User(req.body);
            user.admin = true;
            user.accountNumber = user._id;

            try {
                await user.save();
                const token = await user.generateAuthToken()
                res.status(201).send({ user, token });

            } catch (e) {
                res.status(400).send(e);
            }
        });

auth.post('/api/signin', 
            body('email').isLength({ min: 3 }), 
            body('password').isLength({ min: 3 }), 
            async (req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                try {
                    const user = await User.findByCredentials(req.body.email, req.body.password)
                    const token = await user.generateAuthToken();
                    
                    res.send({ user, token });
                } catch (e) {
                    res.status(400).send({error: e})
                }

});

auth.post('/api/signinadmin', 
            body('email').isLength({ min: 3 }), 
            body('password').isLength({ min: 3 }), 
            async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                try {
                    const user = await User.findByCredentials(req.body.email, req.body.password)
                    const token = await user.generateAuthToken()
                    if (!user.admin) {
                        throw new Error
                    }

                    res.send({ user, token })
                } catch (e) {
                    console.log(e)
                    res.status(400).send({
                        message: 'no such user'
                    })
                }

});

router.post('/api/logout', authenticator, async (req, res) => {
    
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({
            message: 'logged out'
        })
    } catch (e) {
        res.status(500).send({
            message: "logout failed"
        })
    }
})

export default auth;