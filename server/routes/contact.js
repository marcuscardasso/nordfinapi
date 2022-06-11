import express from 'express';

import utils from "../utils";
const {  authenticator } = utils;

const { body, validationResult } = require('express-validator');
const router = express.Router();
const contact = router;

import Contact from '../models/contact';

contact.post('/api/contact', 
    body('email').isLength({ min: 3 }),
    body('message').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }), 
    body('email').isEmail(), 
    async (req, res) => {
        const contact = new Contact(req.body);

        try {
            await contact.save();
            res.status(201).send({
                message: "your message has been sent, you'll be contacted asap",
                contact
            });

        } catch (e) {
            res.status(400).send(e);
        }
});

contact.get('/api/contact', authenticator, (req, res) => {
    const { user } = req;
    if (user.admin) {
        Contact.find().then(contacts => {
            res.status(201).send({ 
                contacts
            });
        })
    }
});

export default contact;