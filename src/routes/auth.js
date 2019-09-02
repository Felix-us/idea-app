import { Router } from "express";
import User from '../models/Users';

import jwt from 'jsonwebtoken';

const router = new Router();

// auth signup
router.post('/signup', (req, res) => {
    User.findOne({email: req.body.email}).then((result) => {
        if (result) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            user.save().then((result) => {
                res.status(200).json({
                    success: true,
                    message: 'Successful created user',
                    data: result
                });
            }).catch((err) => {
                res.status(400).json({
                    success: false,
                    message: err
                });
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err
        });
    });
});

// auth login
router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.verifyPassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), 'SecretKey', { expiresIn: '30m' });
                    res.json({
                        success: true,
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: err
        });
    });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google');
});

export default router;