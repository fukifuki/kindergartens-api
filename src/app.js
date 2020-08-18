const express = require('express');
const morgan = require('morgan');
require('../config/env').loadEnvironment();
require('../config/db').connectDB().catch(() => console.log('Error connecting to DB'));
const kindergartenRouter = require('./routers/kindergarten');

const app = express();

app.use(express.json());
app.use('/api/v1/kindergartens', kindergartenRouter);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

module.exports = app;