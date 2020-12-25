const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    tokens: [{
        token: String
    }]
});

userSchema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({ username });

    if(!user) {
        throw new Error('No such user');
    }

    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to authenticate');
    }

    return user;
};

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

module.exports = mongoose.model('User', userSchema);