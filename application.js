import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';

import mongodb from './config/db';
import authRouter from './src/routes/auth';

// Initial app
const app = express();
dotenv.config();
mongodb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/log.html'));
});

// set up routes
app.use('/auth', authRouter);

export default app;