const express = require('express');
const morgan = require('morgan');
const loadEnvironment = require('../config/env');
const connectToDB = require('../config/db');

loadEnvironment((environment) => console.log(`Loaded ${environment} environment`));
connectToDB((host) => console.log(`Connected to DB ${host}`));

const app = express();

// set logger if development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/hello', (req, res) => {
    res.send('Hello KG API');
});

const APP_PORT = process.env.APP_PORT || 3000;
app.listen(
    APP_PORT,
    () => console.log(`KG API running on port ${APP_PORT}`)
);