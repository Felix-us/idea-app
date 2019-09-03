import { Router } from "express";
import User from '../models/User';

import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = new Router();

const requireLogin = passport.authenticate('local', { 
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: true,
    session: false 
});

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
router.post('/signin', requireLogin, (req, res) => {
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
                    var payload = { id: user.id };
                    var token = jwt.sign(payload, process.env.API_JWT_SECRET, { expiresIn: '1h' });
                    res.json({
                        success: true,
                        token: token,
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }
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
    // res.send('logging out');
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

// auth with google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google');
});

export default router;