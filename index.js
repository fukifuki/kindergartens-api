const dotenv = require('dotenv');
const express = require('express');
const createDBConnection = require('./config/db');

dotenv.config({path: './config/.env'});

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello KG API');
});

createDBConnection((host) => console.log(`Connected to DB ${host}`));

const APP_PORT = process.env.APP_PORT || 3000;
app.listen(
    APP_PORT,
    () => console.log(`KG API running on port ${APP_PORT}`)
);

