const User = require('../models/user');
const jwt = require('../utils/jwt');

exports.register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const token = jwt.generateToken(user.id);
        user.tokens = user.tokens.concat({ token });
        await user.save();

        res
            .status(201)
            .json({ user, token });
    } catch(e) {
        res
            .status(500)
            .json({ status: 400, message: e.message });
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json('Username and password are needed for authentication');
    }

    try {
        const user = await User.findByCredentials(username, password);

        if(!user) {
            return res.status(400).json('Unable to authenticate user');
        }

        const token = jwt.generateToken(user.id);
        user.tokens = user.tokens.concat({ token });
        await user.save();

        res
            .status(201)
            .json({ user, token });
    } catch(e) {
        res
            .status(500)
            .json({ status: 400, message: e.message });
    }
};