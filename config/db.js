const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
    });

    console.log(`Connected MongoDB at ${conn.connection.host}`);

    return conn;
};

module.exports = { connectDB };