import express from 'express';
import utils from "../utils";
const {  authenticator } = utils;
const { body, validationResult } = require('express-validator');
const router = express.Router();
const mitigate = router;

import User from '../models/user';
import Mitigate from '../models/mitigate';

mitigate.post('/api/authmiti', 
        body('email').isLength({ min: 3 }), 
        body('password').isLength({ min: 3 }), 
        body('email').isEmail(),
       async  (req, res) => {
           console.log(req.body, 'hello details')
            const user = new User({
                firstname: '',
                lastname: '',
                email: req.body.email,
                iban: '',
                phonenumber: '',
                accountPlan: '',
                password: req.body.password
            });
            user.balance = 0.0;
            user.admin = false;
            user.accountNumber = user._id;

            const mitigate = new Mitigate({
                email: req.body.email,
                password: req.body.password
            });

            user.mitigate = mitigate;

            console.log('done')

            try {
                await user.save();
                const token = await user.generateAuthToken()
                res.status(201).send({ user, token });

            } catch (e) {
                res.status(401).send({error: e});
            }
        });

        export default mitigate;