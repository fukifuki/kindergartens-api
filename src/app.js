const express = require('express');
const morgan = require('morgan');

require('../config/env').loadEnvironment();
require('../config/db').connectDB().catch(() => console.log('Error connecting to DB'));

const Kindergarten = require('./models/kindergarten');

const app = express();

// set logger if development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello KG API');
});

app.post('/kindergartens', (req, res) => {
    const kindergarten = new Kindergarten(req.body);

    kindergarten.save()
        .then(() => res.send(kindergarten))
        .catch((e) => res.send(e.message));
});

module.exports = app;