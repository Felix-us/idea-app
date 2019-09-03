import { Router } from 'express';
import passport from 'passport';
import User from '../models/User';

const router = new Router();

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/profile', requireAuth,
    function(req, res) {
        // console.log(res);
        res.send(req.user);
    }
);

export default router;