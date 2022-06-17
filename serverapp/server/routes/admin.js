import express from 'express';

import utils from "../utils";
const {  authenticator } = utils;

const router = express.Router();
const admin = router;

import User from '../models/user';

admin.get('/api/admingetuser', authenticator, async (req, res) => {
    const { user } = req;
    const { id } = req.query;
    
    if (user.admin) {
        const user = await User.findOne({ _id: id });

        res.send({
            message: 'user',
            user
        })
    } else {
        res.send({
            message: 'not admin'
        })
    }
});

admin.get('/api/getusers', authenticator, (req, res) => {
    const { user } = req;
    if (user.admin) {
        User.find().then(users => {
            res.status(201).send({ 
                users
            });
        })
    }
});

admin.patch('/api/patchuser', authenticator, async (req, res) => {
    const admin = req.user;

    if (admin.admin) {
        const { userid } = req.query;

        User.findById(userid).then(async user => {
            const updates = Object.keys(req.body);
            const allowedUpdates = [
                'accountPlan', 
                'balance', 
                'requirement',
                'notifications', 
                'transactions'
            ];
            
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        
            if (!isValidOperation) {
                return res.status(400).send({ error: 'Invalid updates!' })
            }
        
            try {
                updates.forEach((update) => {
                    if (update === 'transactions') {
                        const { transactions } = req.body;

                        if (transactions.length) {
                            const transacs = user.transactions;
                            user.transactions = [...transacs, ...transactions];
                        }

                    } else if (update === 'notifications') {
                        const { notifications } = req.body;

                        if (notifications.length) {
                            const notifs = user.notifications;
                            user.notifications = [...notifs, ...notifications]
                        }
                    } else {
                        user[update] = req.body[update]
                    }
                })
                await user.save()
                res.send({
                    user_updated: user
                })
            } catch (e) {
                console.log(e);
                res.status(400).send(e)
            }
        })
    }
})

export default admin;