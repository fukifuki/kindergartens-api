const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
    media: { type: String, enum: [ 'Facebook', 'Instagram' ], required: true},
    link: { type: String, required: true }
});

module.exports = SocialMediaSchema;