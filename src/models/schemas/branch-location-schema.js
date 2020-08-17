const mongoose = require('mongoose');

const BranchLocationSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true, maxLength: [150, 'Name can\'t be longer then 150 characters'] },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    }
});

module.exports = BranchLocationSchema;