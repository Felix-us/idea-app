import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';

// Passport Config
import './config/passport';

import mongodb from './config/db';
import authRouter from './src/routes/auth';
import chatRouter from './src/routes/chat';
import userRouter from './src/routes/user';

// Initial app
const app = express();
dotenv.config();
mongodb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(logger('dev'));
app.use(express.static('public'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/chat_room', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/chat_room.html'));
});

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/log.html'));
});

// set up routes
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/users', userRouter);

export default app;