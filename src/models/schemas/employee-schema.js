const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    role: { type: String, required: true},
    aboutMe: { type: String, required: true, maxlength: [500, 'About me can\'t be longer then 500 characters'] },
    imageUrl: String
});

module.exports = EmployeeSchema;