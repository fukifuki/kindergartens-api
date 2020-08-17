const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const BranchLocationSchema = require('./schemas/branch-location-schema');
const EmployeeSchema = require('./schemas/employee-schema');
const SocialMediaSchema = require('./schemas/social-media-schema');


const KindergartenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, 'Name can\'t be longer then 50 characters']
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [150, 'Full Name can\'t be longer then 150 characters']
    },
    slug: String,
    description: {
        type: String,
        maxlength: [500, 'Description can\'t be longer then 500 characters']
    },
    goal: {
        type: String,
        maxlength: [500, 'Goal definition can\'t be longer then 500 characters']
    },
    website: {
        type: String,
        validate(value) {
            if (!isURL(value)) throw new Error('Invalid URL')
        }
    },
    locations: {
        type: [BranchLocationSchema],
        validate(value) {
            if (!value.length) {
                throw new Error('No locations provided');
            }
        }
    },
    phoneNumbers: {
        type: [String],
    },
    email: {
        type: String,
        validate(value) {
            if(!isEmail(value)) throw new Error('Invalid email address')
        }
    },
    socialMedia: { type: [SocialMediaSchema], required: false },
    team: {
        members: {
            type: [EmployeeSchema],
            required: false
        },
        groupImageUrl: {
            type: String
        },
        about: {
            type: String,
            maxLength: [500, 'Full Name can\'t be longer then 150 characters']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // certificates: [Certificate],
});

module.exports = mongoose.model('Kindergarten', KindergartenSchema);