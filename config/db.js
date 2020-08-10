const mongoose = require('mongoose');

const connectToDB = async (cb) => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    cb(conn.connection.host);
};

module.exports = connectToDB;
