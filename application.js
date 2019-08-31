import express from 'express';
import dotenv from 'dotenv';

import mongodb from './config/db';

// Initial app
const app = express();
dotenv.config();
mongodb();

export default app;