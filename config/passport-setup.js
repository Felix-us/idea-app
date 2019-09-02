import passport from 'passport';
import User from '../src/models/Users';

var LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt'.Strategy);

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function (email, password, callback) {
    User.findOne({ email, password }).then((user) => {
        if (!user || !user.validPassword(password)) {
            return callback(null, false, { message: 'Incorrect email or password' });
        }
        return callback(null, user, { message: 'Logged in successfully' });
    }).catch((err) => {
        return callback(err);
    });
}));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
    User.findOne({ id: jwt_payload._id }).then((user) => {
        return callback(null, user);
    }).catch((err) => {
        return callback(err);
    });
}));
