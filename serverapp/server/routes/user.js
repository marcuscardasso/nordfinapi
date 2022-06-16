import express from 'express';

import utils from "../utils";
const {  authenticator } = utils;

const router = express.Router();
const user = router;

import User from '../models/user';

user.patch('/api/edituser', authenticator, async (req, res) => {

    const updates = Object.keys(req.body)
    console.log(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'email', 'phonenumber'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
});

user.get('/api/getuser', authenticator, async (req, res) => {
    await res.send({
        message: 'user',
        user: req.user,
        token: req.token
    })
});

user.post('/api/request', authenticator, async (req, res) => {
    const { body, user } = req;
    user.requests.push(body);

    try {
        await user.save()
        res.send({
            message: 'request sent',
            user
        })
    } catch (e) {
        res.status(400).send(e)
    }
});

user.patch('/api/edituserpw', authenticator, async (req, res) => {
    const { email, oldpassword, newpassword } = req.body;

    try {
        const user = await User.findByCredentials(email, oldpassword);
        
        if (user) {
            user.password = newpassword;
            user.save();
            res.status(201).send({
                message: "password changed",
                user
            });
        }
    } catch(e) {
        res.status(400).send({
            message: "wrong password"
        })
    }
})



export default user;