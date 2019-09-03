import dotenv from 'dotenv';
import passport from 'passport';
import User from '../src/models/User';

dotenv.config();

var LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
}, function (email, password, done) {
    // console.log(0)
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { error: 'Incorrect email. Please try again.' });
        }

        user.verifyPassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { error: 'Incorrect password. Please try again.' });
            }
            return done(null, user, { message: 'Logged in successfully' });
        });
    });
}));

passport.serializeUser(function (user, done) {
    // console.log(1)
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // console.log(2)
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.API_JWT_SECRET;
//opts.issuer = 'test@gmail.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //console.log(jwt_payload.id);
    User.findOne({ _id: jwt_payload.id } , (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

