const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).send({ status: 401, message: 'Not authenticated' })
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({_id: payload.id, 'tokens.token': token });

        if (!user) {
            return res.status(401).send({status: 401, message: 'Not authenticated'})
        }

        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ status: 401, message: 'Not authenticated' });
    }
};