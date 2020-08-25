const User = require('../models/user');

exports.createUser = async (req, res, next) => {
    const user = new User(req.body);

    try {
        await user.save();
        res
            .status(201)
            .json({ status: 201, message: 'User successfully created' });
    } catch(e) {
        res
            .status(500)
            .json({ status: 400, message: e.message });
    }
};

exports.readUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res
            .status(200)
            .json(users);
    } catch (e) {
        res
            .status(500)
            .json({ status: 500, message: e.message })
    }
};

exports.readUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res
                .status(404)
                .send({ status: 404, message: 'Not found' });
        }

        res
            .status(200)
            .json(user);
    } catch(e) {
        res
            .status(500)
            .json({ status: 500, message: e.message });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res
                .status(404)
                .send({ status: 404, message: 'User not found' });
        }

        const updates = Object.keys(req.body);
        updates.forEach(update => user[update] = req.body[update]);

        await user.save();

        res
            .status(200)
            .send(user);
    } catch(e) {
        res
            .status(500)
            .json({ status: 500, message: e.message })
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res
                .status(404)
                .json({ status: 404, message: 'User not found' });
        }

        res
            .status(200)
            .json({ status: 200, message: 'User successfully deleted'});
    } catch(e) {
        res
            .status(500)
            .json({ status: 500, message: e.message });
    }
};