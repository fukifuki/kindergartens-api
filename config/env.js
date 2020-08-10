const dotenv = require('dotenv');
const path = require('path');

const loadEnvironment = (cb) => {
    const environment = process.env.NODE_ENV || 'development';
    const envFilePath = path.join(__dirname, './env', '/', `${environment}.env`);

    if (!envFilePath) throw new Error('Cannot load environment!');

    dotenv.config({ path: envFilePath });

    if(cb) cb(environment);
};

module.exports = loadEnvironment;